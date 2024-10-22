import { useAlchemy } from "@/contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { Contract as AlchemyContract, Block, OwnedNft } from "alchemy-sdk";
import envs from "@/envs";
import contractArtifact from "../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { BlockNote, Note, TransferedNote } from "@/types";
import { BrowserProvider, Contract } from "ethers";
import { NoteType, Path } from "@/enums";
import { useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";
import NewNote from "@/types/NewNote";
import { ConvertModal, DeleteModal } from "@/modals";

const QUERY_KEY = 'block-notes';

const useBlockNotes = (noteId?: string) => {
  const alchemy = useAlchemy();
  const queryClient = useQueryClient()
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS, PROOF_TOKEN_URI } = envs;
  const navigate = useNavigate();

  const { data: notes, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY, noteId, address],
    queryFn: async () => {
      const alchemyProvider = await alchemy.config.getProvider();

      const contract = new AlchemyContract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        alchemyProvider
      )

      if (noteId) {
        const tokenId = await contract.notesIds(noteId);
        if (tokenId) {
          const note = await contract.notes(tokenId);
          const timestamp = Number(note[3]);
          const date = new Date(timestamp * 1000);
          const owner = await contract.ownerOf(tokenId);

          const blockNote: BlockNote = {
            id: noteId,
            name: note[1] as string,
            description: note[2] as string,
            date,
            tokenId: tokenId,
            image: "" as string,
            type: NoteType.BLOCK,
            owner
          }

          return [blockNote];
        }
      }


      if (address === undefined) return [];

      const getBlockNote = async (nft: OwnedNft) => {
        try {
          const note = await contract.notes(BigInt(nft.tokenId));
          const metadata = await fetch(nft.raw.tokenUri as string);
          const { image } = await metadata.json();

          const timestamp = Number(note[3]);
          const date = new Date(timestamp * 1000);

          const blockNote: BlockNote = {
            id: note[0] as string,
            name: note[1] as string,
            description: note[2] as string,
            date,
            tokenId: Number(nft.tokenId),
            image: image as string,
            type: NoteType.BLOCK,
            owner: address
          }
          return blockNote;
        } catch (e) {
          return undefined
        }
      }

      const { ownedNfts } = await alchemy.nft.getNftsForOwner(address);
      const filteredOwnedNfts = ownedNfts.filter(nft => nft.contract.address === CONTRACT_ADDRESS);
      const blockNotesPromises = filteredOwnedNfts.map(n => getBlockNote(n));
      const blockNotes = await Promise.all(blockNotesPromises);


      return blockNotes.filter(p => p !== undefined).sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) return 1;
        if (a.date.getTime() > b.date.getTime()) return -1;
        return 0
      });
    },
    enabled: address !== undefined || noteId !== "",
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const {
    mutateAsync: createNote,
    isSuccess: blockNoteCreated,
    isPending: creatingBlockNote
  } = useMutation({
    mutationFn: async ({ name, description }: NewNote) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.createNote(name, description, PROOF_TOKEN_URI);

      return await response.wait();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      navigate(Path.BLOCK_NOTES);
    }
  });

  const {
    mutate: updateNote,
    isSuccess: blockNoteUpdated,
    isPending: updatingBlockNote
  } = useMutation({
    mutationFn: async (note: Note) => {
      if (!walletProvider) return;

      const blockNote = note as BlockNote;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.updateNote(blockNote.tokenId, note.name, note.description);

      await response.wait();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      navigate(Path.BLOCK_NOTES)
    }
  });

  const {
    mutateAsync: deleteNoteMutation,
    isSuccess: blockNoteDeleted,
    isPending: deletingBlockNote
  } = useMutation({
    mutationFn: async (note: BlockNote) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.burn(note.tokenId);

      await response.wait();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      navigate(Path.BLOCK_NOTES)
    }
  });

  const deleteNote = (note: Note) => {
    DeleteModal(() => deleteNoteMutation(note as BlockNote))
  }

  const {
    mutate: transferNote,
    isSuccess: blockNoteTransfered,
    isPending: transferingBlockNote,
  } = useMutation({
    mutationFn: async ({ note, to }: TransferedNote) => {
      if (!walletProvider) return;

      const blockNote = note as BlockNote;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.safeTransferFrom(address, to, blockNote.tokenId);

      return await response.wait();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      navigate(Path.BLOCK_NOTES);
    }
  });

  const convertToLocal = async (
    note: Note,
    createLocalNote: (note: NewNote) => void
  ) => {
    ConvertModal(note, async () => {
      await createLocalNote({ name: note.name, description: note.description });
      await deleteNoteMutation(note as BlockNote)
      navigate(Path.LOCAL_NOTES);
    })
  }

  const convertToWeb = async (
    note: Note,
    createWebNote: (note: NewNote) => void
  ) => {
    ConvertModal(note, async () => {
      await createWebNote({ name: note.name, description: note.description });
      await deleteNoteMutation(note as BlockNote);
      navigate(Path.WEB_NOTES);
    });
  }

  return {
    isConnected,
    blockNotes: notes,
    isLoading: isFetching,
    refetch,
    createNote,
    creatingNote: creatingBlockNote,
    createdNote: blockNoteCreated,
    updateNote,
    deleteNote,
    deletingBlockNote,
    blockNoteDeleted,
    transferNote,
    transferingBlockNote,
    blockNoteTransfered,
    convertToWeb,
    convertToLocal
  }
}

export default useBlockNotes;