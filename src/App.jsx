import { useState ,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numallow, setNumallow] = useState(false)
  const [charallow, setCharallow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow)str+="0123456789"
    if(charallow)str+="!@#$%^&*_-+=~`[]{}"
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
  },[length,numallow,charallow,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numallow,charallow,passwordGenerator])

  const passRef=useRef(null)

  const cpypass=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className='w-full px-6'>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg mt-12 px-4 py-3 my-8
      text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input type="text"
               value={password}
               className='outline-none w-full py-1 px-3'
               placeholder='Password'
               readOnly
               ref={passRef}
            />
            <button
            onClick={cpypass}
             className='outline-none bg-blue-700 text-white
            px-3 py-0.5 shrink-0' >Copy</button>
        </div>
        <div className='flex flex-col sm:flex-row text-base gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input
             type="range" 
             min={8}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
             type="checkbox" 
             defaultChecked={ numallow}
             id='numberInput'
             className='cursor-pointer'
             onChange={()=>{setNumallow((prev)=>!prev)}}
             />
             <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
             type="checkbox" 
             defaultChecked={charallow}
             id='numberInput'
             className='cursor-pointer'
             onChange={()=>{setCharallow((prev)=>!prev)}}
             />
             <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
