import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { nanoid } from 'nanoid'

export default function Home() {

  let [urlDest, setUrlDest] = useState('')

  function createShortener() {

    const input = document.getElementById('fieldInput')
    const inputText = document.getElementById('inputText')

    if ((urlDest.indexOf("http://") == 0 || urlDest.indexOf("https://") == 0) && urlDest.indexOf(".") != -1) {
      input.classList.remove('border-red-500')
      input.classList.add('border-green-500')
      inputText.classList.remove('text-red-500')

      fetch('/api/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shortId: nanoid(6),
          urlDest: urlDest
        })
      }).then(res => res.json())
        .then(res => {
          const fieldResponse = document.getElementById("fieldResponse")
          const fieldInput = document.getElementById("fieldInput")
          const inputResponse = document.getElementById("inputResponse")

          fieldResponse.classList.remove("hidden")
          fieldInput.classList.add("hidden")
          inputResponse.value = 'http://localhost:3000/api/' + res.data.shortId
        });

    } else {
      input.classList.add('border-red-500')
      input.classList.remove('border-gray-400')
      inputText.classList.add('text-red-500')
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
        <title>ENCURTADOR</title>
      </Head>

      <div className="flex flex-col items-center justify-center w-10/12 h-screen mx-auto">
        <Image src="/logo.svg" width="196" height="196" />
        <h1 className="mt-4 text-3xl">URL SHORTENER</h1>
        <div id="fieldInput" className="w-full mt-8 bg-gray-200 border border-gray-400 rounded rounded-l md:max-w-3xl">
          <input id="inputText" placeholder="https://" value={urlDest} onChange={(e) => setUrlDest(urlDest = e.target.value)} autoComplete="off" className="w-8/12 p-3 bg-gray-200 rounded-l focus:outline-none focus:text-green-600 focus:bg-white" type="text" />
          <button onClick={createShortener} id="btn" className="w-4/12 p-3 font-bold text-white bg-green-500 rounded-r focus:outline-none hover:bg-green-600">SHORT</button>
        </div>
        <div id="fieldResponse" className="hidden w-full mt-8 bg-gray-200 border border-gray-400 rounded rounded-l md:max-w-3xl">
          <input id="inputResponse" readOnly autoComplete="off" className="w-8/12 p-3 bg-gray-200 rounded-l focus:outline-none focus:text-blue-600 focus:bg-white" type="text" />
          <button id="btn" className="w-4/12 p-3 font-bold text-white bg-blue-500 rounded-r focus:outline-none hover:bg-blue-600">COPY!</button>
        </div>
        <p className="mt-20 text-green-800 opacity-80">Enjoy, completely free, forever!</p>
      </div>

    </>
  )
}
