import { useAlchemy } from "@/contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { Contract as AlchemyContract, Block, Nft, OwnedNft } from "alchemy-sdk";
import envs from "@/envs";
import contractArtifact from "../../../artifacts/contracts/Notes256.sol/Notes256.json";
import { BlockNote, Note } from "@/types";
import { BrowserProvider, Contract } from "ethers";

const useBlockNotes = () => {
  const alchemy = useAlchemy();
  const queryClient = useQueryClient()
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { CONTRACT_ADDRESS, PROOF_TOKEN_URI } = envs;

  const { data: notes, isSuccess, isFetching, isError, refetch } = useQuery({
    queryKey: ["blockNotes"],
    queryFn: async () => {
      if (address === undefined) return [];

      const alchemyProvider = await alchemy.config.getProvider();

      const contract = new AlchemyContract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        alchemyProvider
      )

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
            editable: false
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
    enabled: address !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const {
    mutate: createNoteMutation,
    isSuccess: blockNotecreated,
    isPending: creatingBlockNote
  } = useMutation({
    mutationFn: async ({ name, description }: { name: string, description: string }) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.createNote(name, description, PROOF_TOKEN_URI);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blockNotes"] })
  });

  const {
    mutate: deleteNoteMutation,
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blockNotes"] })
  });

  const {
    mutate: transferNoteMutation,
    isSuccess: blockNoteTransfered,
    isPending: transferingBlockNote
  } = useMutation({
    mutationFn: async ({ to, tokenId }: { to: string, tokenId: number }) => {
      if (!walletProvider) return;

      const ethersProvider = new BrowserProvider(walletProvider);

      const signer = await ethersProvider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);

      const response = await contract.safeTransferFrom(address, to, tokenId);

      await response.wait();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blockNotes"] })
  });

  const createNote = async (name: string, description: string) => {
    createNoteMutation({ name, description });
  }

  const updateNote = async (note: Note) => { }

  const deleteNote = async (note: Note) => {
    deleteNoteMutation(note as BlockNote)
  }

  return {
    blockNotes: notes,
    isLoading: isFetching,
    refetch,
    createBlockNote: createNote,
    updateBlockNote: updateNote,
    deleteBlockNote: deleteNote
  }
}

export default useBlockNotes;