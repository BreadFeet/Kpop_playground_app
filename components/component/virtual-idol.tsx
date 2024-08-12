/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0xL9J5AzyZV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function VirtualIdol() {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [editPrompt, setEditPrompt] = useState("");

  const gender = [
    {id: "g1", value: "Female"},
    {id: "g2", value: "Male"},
    {id: "g3", value: "Mixed"},
  ]

  const agency = [
    {id: "a1", value: "SM"},
    {id: "a2", value: "JYP"},
    {id: "a3", value: "HYBE"},
    {id: "a4", value: "YG"},
    {id: "a5", value: "CUBE"},
    {id: "a6", value: "Starship"},
  ]

  const target = [
    {id: "t1", value: "Hiphop"},
    {id: "t2", value: "Pop"},
    {id: "t3", value: "Sexy"},
    {id: "t4", value: "Highteen"},
    {id: "t5", value: "Friendly"},
    {id: "t6", value: "Funny"},
  ]

  const [state, setState] = useState({
    gender: "",
    member: 0,
    agency: "",
    target: "",
    bandname: "",
  });

  const handleInput = (name: string, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateIdol = async () => {
    setImageIsLoading(true);
    const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `You are an K-pop band expert working in K-poop industry. Create a realistic ${state.gender} K-pop band \
        with ${state.member} members. This band is organised from ${state.agency} entertainment agency, so follow the style of previous bands of the agency. \
        Consider that the concept of this band is ${state.target} and the band name is ${state.bandname}. The appearance should align \
        with the concept and the band name. The generate image should be realistic and high-resolution with clear view of faces. ${editPrompt}`,
        negative_prompt: "western face, blurry and unrealistic human, text on the image",
        steps: 30,
        cfg_scale: 7
      })
    })
    const data = await response.json();
    setImage(data.images[0]);
    setImageIsLoading(false);
    console.log(22, editPrompt)
  };

  return (
    <div className="flex h-screen w-full">
      <div className="bg-muted border-r p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <WandIcon className="w-6 h-6" />
            <span>Kpop Playground</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start gap-2">
            <WandIcon className="w-5 h-5" />
            <span>Lightstick Designer</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2 bg-primary text-primary-foreground">
            <ScanFaceIcon className="w-5 h-5" />
            <span>Virtual Idol Creator</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <BrushIcon className="w-5 h-5" />
            <span>Style Transfer</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Music2Icon className="w-5 h-5" />
            <span>Band Name Creator</span>
          </Button>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanFaceIcon className="w-10 h-10" />
            <div>
              <p className="font-bold text-xl">Virtual Idol Creator</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="col-span-1 grid grid-rows-4 gap-4">
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Gender</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <RadioGroup defaultValue="comfortable" className="flex space-x-4" onValueChange={(value) => handleInput("gender", value)}>
                      {gender.map(({id, value}) => (
                        <div className="flex items-center space-x-2" key={id}>
                          <RadioGroupItem value={value} id={id} />
                          <Label htmlFor={id}>{value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Band Members</h3>
                <div className="flex items-center gap-2">
                  <Label htmlFor="band-members" className="text-base">
                    Number of Members
                  </Label>
                  <Input id="band-members" type="number" defaultValue={0} min={1} max={30} className="w-20" onChange={(e) => handleInput("member", e.target.value)} />
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Agency</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <RadioGroup defaultValue="comfortable" className="flex space-x-2" onValueChange={(value) => handleInput("agency", value)}>
                      {agency.map(({id, value})=>(
                        <div className="flex items-center space-x-2" key={id}>
                          <RadioGroupItem name="agency" value={value} id={id} />
                        <Label htmlFor={id}>{value}</Label>
                      </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Target</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <RadioGroup defaultValue="comfortable" className="flex space-x-2" onValueChange={(value) => handleInput("target", value)}>
                      {target.map(({id, value})=>(
                        <div className="flex items-center space-x-2" key={id}>
                          <RadioGroupItem name="target" value={value} id={id} onChange={handleInput} />
                        <Label htmlFor={id}>{value}</Label>
                      </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Band Name</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Textarea
                      className="rounded-md border border-input p-2 text-sm"
                      placeholder="Enter the virtual band name..."
                      name="bandname"
                      rows={1}
                      onChange={(e) => handleInput("bandname", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Idol Generation</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    disabled={!state.gender | state.member==0 | !state.agency | !state.target | !state.bandname}
                    onClick={generateIdol}
                  >
                    Generate Idol
                  </Button>
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                      <div className="grid grid-cols-1 gap-4 p-4">
                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
                          <h3 className="text-lg font-semibold">Your Virtual Idol</h3>
                          {imageIsLoading && (
                            <div className="flex justify-center items-center">
                              <div className="loader animate-pulse text-center">
                                <p classN="mb-4"> Image is being generated... </p>
                                <div className="animate-pulse flex justify-center py-4">
                                  <div className="rounded-full bg-slate-700 h-6 w-6"> </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {image && !imageIsLoading && (
                            <div className="flex justify-center">
                              <img
                                src={`data:image/jpeg;base64, ${image}`}
                                width={500}
                                height={500}
                                alt="Generated Idol"
                                className="rounded-md object-cover"
                                style={{ aspectRatio: "300/300", objectFit: "cover" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-3">
                      <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                        <Input
                          id="message"
                          placeholder="Type what you wish to edit..."
                          disabled={!image | imageIsLoading}
                          className="flex-1"
                          autoComplete="off"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          onClick={() => {
                            setEditPrompt(prevPrompt => prevPrompt + inputValue + ". ");
                            generateIdol();
                            setInputValue("");
                            }}>
                          <SendIcon className="w-5 h-5" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BrushIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  )
}


function Music2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function ScanFaceIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}


function WandIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2" />
      <path d="M15 16v-2" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8 19 13" />
      <path d="M15 9h0" />
      <path d="M17.8 6.2 19 5" />
      <path d="m3 21 9-9" />
      <path d="M12.2 6.2 11 5" />
    </svg>
  )
}