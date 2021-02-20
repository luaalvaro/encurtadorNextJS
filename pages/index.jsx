import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ENCURTADOR</title>
      </Head>

      <div className="flex flex-col items-center justify-center w-10/12 h-screen mx-auto">
        <Image src="/pie-chart.svg" width="196" height="196" />
        <h1 className="mt-4 text-3xl">URL SHORTENER</h1>
        <div className="w-full mt-8 bg-gray-200 border border-gray-400 rounded rounded-l md:max-w-3xl">
          <input className="w-8/12 p-3 bg-gray-200 rounded-l focus:outline-none focus:text-green-600 focus:bg-gray-100" type="text" />
          <button className="w-4/12 p-3 font-bold text-white bg-green-500 rounded-r focus:outline-none hover:bg-green-600">SHORT</button>
        </div>
        <p className="mt-20 text-green-800 opacity-80">Enjoy, completely free, forever!</p>
      </div>

    </>
  )
}