import { useState } from 'react'
import bg_shorten_mobile from '../frontendmentor-folders/images/bg-shorten-mobile.svg'

const UrlShortner = ({setShortnedUrls, setIsLoading, shortnedUrls})=> {
    const [isEmpty, setIsEmpty] = useState(false)
    
    const shortner_url = async (event)=>{
        event.preventDefault()
        if(event.target.target_url.value === ''){
            setIsEmpty(true)
            setTimeout(()=>{setIsEmpty(false)}, 4000)
        }else{
            setIsLoading(true)
            const url = `https://api.shrtco.de/v2/shorten?url=${event.target.target_url.value}`
            try{
                const response = await fetch(url)
                const data   = await response.json();
                setShortnedUrls(prev=>[...prev, data.result])
                setIsLoading(false)
                event.target.target_url.value = ''
                console.log(shortnedUrls)
            }catch(error){
                console.log(error)
            }
        }
    }
  return (
    <form onSubmit={(event)=>shortner_url(event)} className=' flex flex-col gap-4 lg:flex-row p-6 bg-no-repeat rounded-lg bg-right-top bg-contain bg-primary-dark-violet ' style={{backgroundImage: `url(${bg_shorten_mobile})`}}>
        <label className='flex flex-col w-full lg:w-9/12'>
        <input className={`h-fit box-border text-neutral-very-dark-blue font-medium px-4  bg-white rounded-md py-2 text-lg ${isEmpty ? 'outline-none border-4 border-red-300' : ''}`} type="text" name="target_url" id="" placeholder='shorten a link here...'/>
        {
            isEmpty && <span className='text-red-300 font-semibold text-sm'>Please Add a Link</span>
        }
        </label>
        <button className='lg:w-3/12 h-fit  text-white font-semibold capitalize bg-primary-cyan rounded-md py-2 text-lg' type="submit">shorten it!</button>
    </form>
  )
}

export default UrlShortner