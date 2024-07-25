import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { Nft } from "@/types";
import NftCard from "../NftCard/NftCard";

interface NftsListProps {
  nfts: Nft[]
}

const NftsList: FC<NftsListProps> = ({ nfts }: NftsListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        nfts.map(nft => <NftCard key={nft.id} nft={nft} />)
      }
    </SimpleGrid>
  )
}

export default NftsList;