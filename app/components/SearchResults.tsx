import "@/styles/globals.css"
import Image from "next/image"
import placeholder from "../../assets/placeholder.png"

interface SearchResultProps {
  score: number
  show: {
    id: number
    url: string
    name: string
    type: string
    language: string
    genres: string[]
    status: string
    image: {
      medium: string
    }
    summary: string
  }
}

const strip = (html: string) => {
  var tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText
}

const truncate = (str: string) =>
  str.length > 250 ? `${str.substring(0, 247)}...` : str

export const SearchResult = ({
  score,
  show: { id, url, name, type, language, genres, status, image, summary },
}: SearchResultProps) => {
  return (
    <div className="flex w-full my-2 rounded-xl border-2 border-orange-600">
      <Image
        src={image?.medium || placeholder}
        alt={
          image?.medium
            ? `A poster for the TV show ${name}`
            : "A placeholder poster for a TV show"
        }
        width={142}
        height={200}
        className="rounded-l-xl"
      />
      <div className="flex flex-col ml-4 h-full justify-between prose dark:prose-invert">
        <h2 className="text-2xl">{name}</h2>
        <p>{truncate(strip(summary))}</p>
      </div>
    </div>
  )
}
