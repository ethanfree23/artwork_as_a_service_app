import { gql, useQuery } from "@apollo/client"
import { Section } from "components/app"
import { MarketTitle } from "assets/titles"

const ArtOnTheMarket = () => {
  const { loading, error, data } = useQuery(artistsQuery)
  console.log("data", data)

  return (
    <Section className="bg-black text-white">
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-xl font-bold uppercase mb-2">Art on the</h3>
        <MarketTitle className="text-pink" />
      </div>
      <div className="grid gap-10 grid-cols-4">
        {data?.artists.map((artist, index) => (
          <div className="col-span-1 w-full h-96 overflow-hidden flex flex-col gap-2" key="index">
            <img src={artist?.arts[0]?.images[0]?.url} alt="art" className="flex-1 w-full object-cover object-center" />
            <div>
              <h4 className="uppercase font-semibold truncate">{artist?.arts[0]?.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ArtOnTheMarket

const artistsQuery = gql`
  query Query {
    artists {
      arts {
        title
        images {
          url
        }
      }
    }
  }
`

{
  /* <div className="w-full h-24 bg-grey"></div>
        <div className="w-full h-24 bg-grey"></div>
        <div className="w-full h-24 bg-grey"></div>
        <div className="w-full h-24 bg-grey"></div>
        <div className="w-full h-24 bg-grey"></div> */
}
