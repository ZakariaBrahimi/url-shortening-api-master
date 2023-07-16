import bg_shorten_mobile from '../frontendmentor-folders/images/bg-shorten-mobile.svg'

const UrlShortner = ({setShortnedUrls})=> {
    
    const shortner_url = async (event)=>{
        event.preventDefault()
        const url = `https://api.shrtco.de/v2/shorten?url=${event.target.target_url.value}`
        try{
            const response = await fetch(url)
            const data   = await response.json();
            setShortnedUrls(data?.result)
            event.target.target_url.value = ''
            console.log(data?.result)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <form onSubmit={(event)=>shortner_url(event)} className=' flex flex-col gap-4 lg:flex-row p-6 bg-no-repeat rounded-lg bg-right-top bg-contain bg-primary-dark-violet ' style={{backgroundImage: `url(${bg_shorten_mobile})`}}>
        <input className=' text-neutral-very-dark-blue focus:outline-primary-cyan font-medium px-4 lg:w-9/12 bg-white rounded-md py-2 text-lg' type="text" name="target_url" id="" placeholder='shorten a link here...'/>
        <button className='lg:w-3/12 text-white font-semibold capitalize bg-primary-cyan rounded-md py-2 text-lg' type="submit">shorten it!</button>
    </form>
  )
}

export default UrlShortner