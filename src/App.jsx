import React from 'react'
import OpenAI from "openai"
import imageUrl from "/src/assets/parrot.png"
function App() {
    const [isTranslating, setIsTranslating] = React.useState(false)
    const [phrase, setPhrase] = React.useState("")
    const [response, setResponse] = React.useState("")
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY

    const handlePhraseChange = event => {
        setPhrase(event.target.value)
    }
    async function fetchTranslation(phrase) {
        setIsTranslating(true)
        try {
            const messages = [
                {
                    role: "system",
                    content: "You are an expert Japanese translator. You will translate the phrase into Japanese with a comparable level of casualness or formality. You will display both the JAPANESE: and ROMANJI:."
                },
                {
                    role: "user",
                    content: phrase
                }
            ]
            const openai = new OpenAI({
                apiKey,
                dangerouslyAllowBrowser: true
            })

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                temperature: 0.8
            })

            setResponse(response.choices[0].message.content)
            setIsTranslating(false)
        } catch (err) {
            console.log("Error: ", err)
            setIsTranslating(false)
        }
    }

    return (
        <>
            <header>
                <div className="logo-wrapper">
                    <img src={imageUrl} alt="cartoon anthropomorphized parrot" />
                    <div className="title-wrapper">
                        <h1 className="title">PollyGlot</h1>
                        <p className="subtitle">Perfect Translation Every Time</p>
                    </div>
                </div>
            </header>
            <main>
                <div className="border">
                    <h2>Text to Translate 👇</h2>
                    <textarea value={phrase} onChange={handlePhraseChange} placeholder="type here" />
                    <h2>Your Translation 👇</h2>
                    <div className="text-output">{response}</div>
                    <button onClick={() => fetchTranslation(phrase)}>{isTranslating ? "Translating..." : "Translate"}</button>
                </div>
            </main>
        </>
    )
}

export default App
