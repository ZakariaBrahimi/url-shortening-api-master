import bgImage from '../frontendmentor-folders/images/illustration-working.svg'
import bg_boost_mobile from '../frontendmentor-folders/images/bg-boost-mobile.svg'
import UrlShortner from './UrlShortner'
import { useState, useEffect, useRef } from 'react'
import ReactLoading from 'react-loading';
import 'animate.css';

function App() {
    const [shortnedUrls, setShortnedUrls] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const copyToClibBoard = (event)=>{
        const short_url = event.target.parentElement.firstChild.innerText
        navigator.clipboard.writeText(short_url)
        setIsCopied(true)
        setTimeout(()=>{setIsCopied(false)}, 5000)
        

    }
    const delete_short_url = (event)=>{
        const code = event.target.id
        setShortnedUrls(current =>
            current.filter(url => {
              return url.code !== code;
            }),
          );
        

    }
    // useEffect(()=>{console.log(shortnedUrls)}, [shortnedUrls])
    const [isOpen, setIsOpen] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const handleNavigation = ()=>{
        setScreenWidth(window.innerWidth)
        if(screenWidth >= 1024){
            setIsOpen(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleNavigation);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleNavigation);
        };
      }, []);
    //   Close navigation bar when the screen is resized to fit the desktop resolution
      useEffect(() =>{
        if(screenWidth >= 1024){
            setIsOpen(false);
        }
      }, [screenWidth]);

    //   Animlate cards container when scrolling to the cards container part
    // 

    



  const containerRef = useRef();
  const targetRef = useRef();

  const handleScroll = () => {
    if (!targetRef.current || !containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;
    const targetTop = targetRef.current.getBoundingClientRect().top;
    const containerHeight = containerRef.current.clientHeight;

    // Adjust the value below based on your specific offset or threshold
    const threshold = 50;

    if (targetTop >= containerTop && targetTop <= containerTop + containerHeight - threshold) {
      // Element is in view
      console.log('Element is in view!');
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener when the component unmounts
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const onScroll = () => {
    if (targetRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = targetRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        console.log("Reached bottom");
        // DO SOMETHING HERE
      }
    }
  };

  useEffect(() => {
    const listInnerElement = targetRef.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);
  return (
    <div ref={containerRef}>

        <nav className="flex  justify-between items-center my-7 w-11/12 md:w-9/12 mx-auto  z-40">
                
            {/* LOGO */}
            <div className='flex gap-4 items-center'>
                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="121" height="33"><path fill="#34313D" d="M16.715 7.932c-.068-.09-.306-.26-.714-.51s-.918-.51-1.53-.782-1.281-.51-2.006-.714a8.005 8.005 0 00-2.176-.306c-1.995 0-2.992.669-2.992 2.006 0 .408.107.748.323 1.02.215.272.532.516.952.731.419.215.946.414 1.58.595l1.406.393.805.219c1.156.317 2.198.663 3.128 1.037.929.374 1.717.839 2.363 1.394a5.647 5.647 0 011.496 2.023c.35.793.527 1.745.527 2.856 0 1.36-.255 2.51-.765 3.451-.51.94-1.185 1.7-2.023 2.278-.84.578-1.802.997-2.89 1.258-1.088.26-2.21.391-3.366.391a19.68 19.68 0 01-5.44-.799c-.884-.26-1.74-.572-2.567-.935A14.358 14.358 0 01.53 22.28l2.448-4.862c.09.113.385.329.884.646.498.317 1.116.635 1.853.952.736.317 1.558.6 2.465.85.906.25 1.824.374 2.754.374 1.972 0 2.958-.6 2.958-1.802 0-.453-.148-.827-.442-1.122-.295-.295-.703-.561-1.224-.799a12.455 12.455 0 00-1.504-.56l-1.702-.495-.976-.288c-1.111-.34-2.074-.708-2.89-1.105-.816-.397-1.49-.856-2.023-1.377a5.003 5.003 0 01-1.19-1.802c-.261-.68-.391-1.473-.391-2.38 0-1.27.238-2.391.714-3.366a7.266 7.266 0 011.938-2.465 8.435 8.435 0 012.839-1.513c1.076-.34 2.215-.51 3.417-.51.838 0 1.666.08 2.482.238.816.159 1.598.363 2.346.612.748.25 1.445.533 2.09.85.647.317 1.242.635 1.786.952l-2.448 4.624zM40.139 25h-5.44V14.97c0-1.156-.227-2.006-.68-2.55-.454-.544-1.077-.816-1.87-.816-.318 0-.663.074-1.037.221a4.173 4.173 0 00-1.088.646 5.827 5.827 0 00-.97 1.003 4.4 4.4 0 00-.68 1.292V25h-5.44V.18h5.44v9.962a6.786 6.786 0 012.602-2.465c1.076-.578 2.26-.867 3.553-.867 1.201 0 2.17.21 2.907.629.736.42 1.303.952 1.7 1.598.396.646.663 1.371.799 2.176.136.805.204 1.592.204 2.363V25zm12.34.34c-1.519 0-2.873-.25-4.063-.748-1.19-.499-2.193-1.173-3.01-2.023a8.54 8.54 0 01-1.852-2.958 9.97 9.97 0 01-.63-3.519c0-1.224.21-2.397.63-3.519a8.54 8.54 0 011.853-2.958c.816-.85 1.819-1.53 3.009-2.04s2.544-.765 4.063-.765c1.519 0 2.867.255 4.046.765 1.179.51 2.176 1.19 2.992 2.04a8.754 8.754 0 011.87 2.958 9.736 9.736 0 01.646 3.519 9.97 9.97 0 01-.63 3.519 8.54 8.54 0 01-1.852 2.958c-.816.85-1.82 1.524-3.01 2.023-1.19.499-2.543.748-4.062.748zM48.5 16.092c0 1.405.374 2.533 1.122 3.383.748.85 1.7 1.275 2.856 1.275a3.59 3.59 0 001.564-.34c.476-.227.89-.544 1.24-.952a4.57 4.57 0 00.834-1.479 5.632 5.632 0 00.306-1.887c0-1.405-.374-2.533-1.122-3.383-.748-.85-1.689-1.275-2.822-1.275a3.702 3.702 0 00-2.84 1.292 4.57 4.57 0 00-.832 1.479 5.632 5.632 0 00-.306 1.887zm27.776-4.284c-1.315.023-2.505.238-3.57.646-1.065.408-1.836 1.02-2.312 1.836V25h-5.44V7.15h4.998v3.604c.612-1.201 1.4-2.142 2.363-2.822.963-.68 1.989-1.031 3.077-1.054h.544c.113 0 .227.011.34.034v4.896zm14.074 12.24a21.71 21.71 0 01-2.567.884c-.963.272-1.932.408-2.907.408-.68 0-1.32-.085-1.92-.255a4.286 4.286 0 01-1.582-.816c-.453-.374-.81-.867-1.07-1.479-.262-.612-.392-1.349-.392-2.21v-9.316h-2.278V7.15h2.278V1.472h5.44V7.15h3.638v4.114h-3.638v7.446c0 .59.147 1.014.442 1.275.295.26.669.391 1.122.391.408 0 .827-.068 1.258-.204.43-.136.805-.283 1.122-.442l1.054 4.318zM92.627.18h5.44v18.462c0 1.36.578 2.04 1.734 2.04.272 0 .572-.04.901-.119.329-.08.63-.198.901-.357l.714 4.08c-.68.317-1.462.567-2.346.748-.884.181-1.711.272-2.482.272-1.564 0-2.765-.408-3.604-1.224-.839-.816-1.258-1.995-1.258-3.536V.18zm11.456 27.506c.454.159.879.272 1.275.34a6.4 6.4 0 001.071.102c.658 0 1.168-.227 1.53-.68.363-.453.692-1.27.986-2.448l-6.8-17.85h5.61l4.148 13.192 3.57-13.192h5.1l-6.8 20.74a7.106 7.106 0 01-2.55 3.587c-1.224.918-2.674 1.377-4.352 1.377a8.17 8.17 0 01-1.377-.119 7.516 7.516 0 01-1.41-.391v-4.658z"/></svg>
                <ul className={`${screenWidth<=1024 ? 'hidden' : 'flex'} gap-6 items-center ml-10`}>
                    <li className='font-semibold cursor-pointer text-neutral-grayish-violet'>Features</li>
                    <li className='font-semibold cursor-pointer text-neutral-grayish-violet'>Pricing</li>
                    <li className='font-semibold cursor-pointer text-neutral-grayish-violet'>Resources</li>
                </ul>
            </div>
            {/* NAVIGATION ITEMS */}
            <div className={`${screenWidth<=1024 ? 'hidden' : 'flex'} gap-6 items-center font-semibold`}>
                <button className='text-neutral-grayish-violet'>Login</button>
                <button className='text-white bg-primary-cyan  rounded-full px-7 py-2'>Sign Up</button>
            </div>
            <button type='button' onClick={()=>setIsOpen(current=>!current)} className={`${screenWidth>1024 ? 'hidden' : 'flex'} flex-col space-y-1`}>
                <div className="w-8 h-1 bg-neutral-grayish-violet"></div>
                <div className="w-8 h-1 bg-neutral-grayish-violet"></div>
                <div className="w-8 h-1 bg-neutral-grayish-violet"></div>
            </button>
        </nav>
        <main className='relative mx-auto w-11/12 md:w-9/12 space-y-12 bg-white pb-32 flex flex-col md:flex-row-reverse items-center' >
        <div className={`${isOpen ? 'flex' : 'hidden'} flex-col z-50 px-4 max-w-80 min-w-fit w-72 py-4 absolute right-[50%] translate-x-[50%] bg-primary-dark-violet rounded-xl text-white`}>
            <ul className={`flex flex-col pb-3 justify-center items-center border-b`}>
                <li className='font-semibold cursor-pointer transition-colors ease-linear duration-300 hover:bg-slate-600 w-full text-center rounded-lg py-2'>Features</li>
                <li className='font-semibold transition-colors ease-linear duration-300 cursor-pointer hover:bg-slate-600 w-full text-center rounded-lg py-2'>Pricing</li>
                <li className='font-semibold transition-colors ease-linear duration-300 cursor-pointer let hover:bg-slate-600 w-full text-center rounded-lg py-2'>Resources</li>
            </ul>
            <div className={`flex pt-3 flex-col gap-1 items-center font-semibold `}>
                <button className='text-white hover:bg-primary-cyan py-2 w-full rounded-full px-5 transition-colors ease-linear duration-300'>Login</button>
                <button className='text-white hover:bg-primary-cyan w-full rounded-full px-5 py-2 transition-colors ease-linear duration-300'>Sign Up</button>
            </div>
        </div>
            
            <div className="  ">
                <img className='' src={bgImage} alt="" />
                {/* <svg className=" absolute -right-36 sm:-right-36 top-0 " xmlns="http://www.w3.org/2000/svg" width="733" height="482"><defs><linearGradient id="a" x1="0%" x2="100%" y1="50%" y2="50%"><stop offset="0%" stop-color="#183866"/><stop offset="100%" stop-color="#1A7FC1"/></linearGradient><linearGradient id="b" x1="-.13%" x2="100%" y1="50.057%" y2="50.057%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="176.072%" x2="310.393%" y1="-566.037%" y2="-534.629%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="58.928%" x2="52.269%" y1="-257.998%" y2="-277.344%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="e" x1="156.099%" x2="8.109%" y1="-63.273%" y2="-76.114%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="f" x1="2361.044%" x2="2162.651%" y1="-16584.906%" y2="-16647.547%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="g" x1="241.391%" x2="133.142%" y1="-426.052%" y2="-412.195%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="106.85%" x2="-35.821%" y1="22.502%" y2="19.27%"><stop offset="0%"/><stop offset="100%" stop-opacity="0"/></linearGradient><linearGradient id="i" x1="14.169%" x2="114.168%" y1="-41.335%" y2="-41.335%"><stop offset="0%" stop-color="#183866"/><stop offset="100%" stop-color="#1A7FC1"/></linearGradient><linearGradient id="j" x1="40.386%" x2="71.43%" y1="39.515%" y2="67.977%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="k" x1="-12.531%" x2="93.689%" y1="44.923%" y2="53.42%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="l" x1="53.702%" x2="43.721%" y1="42.271%" y2="80.595%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="m" x1="190.926%" x2="102.154%" y1="-333.246%" y2="-335.028%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="n" x1="168.578%" x2="111.53%" y1="-126.252%" y2="-126.942%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="o" x1="56.989%" x2="28.128%" y1="43.618%" y2="69.958%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="p" x1="58.095%" x2="57.212%" y1="-1473.571%" y2="-1370.204%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient><linearGradient id="q" x1="-.04%" x2="99.996%" y1="49.993%" y2="49.993%"><stop offset="0%" stop-color="#ECC4D7"/><stop offset="42%" stop-color="#EFD4D1"/><stop offset="100%" stop-color="#F2EAC9"/></linearGradient><linearGradient id="r" x1="99.032%" x2="199.03%" y1="-163.287%" y2="-163.287%"><stop offset="0%" stop-color="#ECC4D7"/><stop offset="42%" stop-color="#EFD4D1"/><stop offset="100%" stop-color="#F2EAC9"/></linearGradient><linearGradient id="s" x1="124.306%" x2="224.306%" y1="-84.564%" y2="-84.564%"><stop offset="0%" stop-color="#ECC4D7"/><stop offset="42%" stop-color="#EFD4D1"/><stop offset="100%" stop-color="#F2EAC9"/></linearGradient><linearGradient id="t" x1="128.89%" x2="24.06%" y1="100.36%" y2="153.095%"><stop offset="0%" stop-color="#362958" stop-opacity=".501"/><stop offset="100%" stop-color="#34313D" stop-opacity="0"/></linearGradient><linearGradient id="u" x1="3990.942%" x2="3874.36%" y1="-34225.187%" y2="-34268.317%"><stop offset="0%"/><stop offset="99%" stop-opacity="0"/></linearGradient></defs><g fill="none" fill-rule="nonzero"><path fill="#EFF1F7" d="M583.08 92.214c-20.973-22.385-37.208-49.107-62.275-67.375-39.374-28.754-96.041-31.558-142.08-13.494-46.04 18.063-81.905 54.474-105.544 95.703-12.435 21.692-22.202 45.354-40.423 63.08-15.403 14.976-35.648 24.531-54.843 34.938-30.948 16.733-60.752 36.952-80.78 64.695-20.026 27.743-28.98 64.18-16.178 95.446 8.633 21.097 26.022 37.883 43.836 53.081 20.964 17.869 43.496 34.601 69.5 45.248 32.555 13.246 68.694 16.094 104.134 17.442 62.828 2.38 125.757.601 188.319-5.323 51.23-4.844 104.011-13.113 146.874-39.88 60.043-37.484 91-106.163 97.97-173.51 2.836-26.936 2.118-54.928-8.964-79.92-26.504-59.78-98.017-45.798-139.547-90.131z"/><path fill="#3F3D56" d="M178.317 202.334s-16.6-2.947-21.25 8.669c-4.65 11.616 0 51.733 0 51.733L219 307l-40.683-104.666z"/><path fill="#2BD0D0" d="M256.202 379.727l-24.555 7.008c-3.568 1.01-7.31-.952-8.372-4.386-1.047-3.438.987-7.046 4.55-8.069l24.522-7.014c3.565-1.01 7.307.947 8.372 4.379 1.058 3.433-.96 7.045-4.517 8.082z"/><circle cx="255" cy="395" r="11" fill="#25233A"/><circle cx="253.5" cy="397.5" r="5.5" fill="#3F3D56"/><circle cx="210" cy="384" r="11" fill="#25233A"/><path fill="url(#a)" d="M214 384.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"/><circle cx="207" cy="399" r="11" fill="#25233A"/><path fill="#3F3D56" d="M216 399.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"/><path fill="#2BD0D0" d="M257.085 390.874l-50.787-10.046c-3.574-.717-5.884-4.13-5.168-7.636.732-3.5 4.21-5.764 7.785-5.066l50.787 10.027c3.574.717 5.884 4.13 5.168 7.637-.723 3.507-4.204 5.781-7.785 5.084z"/><path fill="#2BD0D0" d="M226 310h14v59c0 3.866-3.133 7-6.997 7a6.999 6.999 0 01-6.996-7v-59H226z"/><path fill="#2BD0D0" d="M231.187 386.708l-24.537 7.025c-3.568 1.014-7.314-.949-8.375-4.388-1.047-3.44.987-7.05 4.548-8.074l24.537-7.005c3.564-1.01 7.304.948 8.368 4.381 1.039 3.435-.99 7.034-4.541 8.06z"/><path fill="url(#b)" d="M236 386.26l-3.125.551a12.89 12.89 0 01-2.875.172l1.305-.228a10.302 10.302 0 002.507-.755l2.188.26z"/><path fill="url(#c)" d="M261 372.738a6.914 6.914 0 01-1.46 4.262L239 372.65a7.113 7.113 0 001.098-2.462l12.654-3.923a6.201 6.201 0 014.913.579c1.5.867 2.609 2.324 3.083 4.048.164.6.249 1.222.252 1.846z"/><path fill="url(#d)" d="M225.22 371.103a5.776 5.776 0 01-.22-1.58V311h5.943v63.07c-.059.31-.04.627.057.93a9.278 9.278 0 00-2.845-.511c-.69-.04-1.385-.04-2.076 0l.425-.1c.262-.04-.94-2.091-1.283-3.286z" opacity=".31"/><path fill="url(#e)" d="M262.289 389.8c-.97.523-2.061.797-3.17.796a7.063 7.063 0 01-1.33-.13l-22.407-4.406-1.867-.363a6.54 6.54 0 01-2.133 1.055l-1.11.317-23.025 6.666c-3.514 1.007-7.202-.943-8.247-4.362 1.997 1.805 5.029 1.973 7.223.401 2.811-1.896 14.002-4.743 20.341-6.257 2.996-.698 5.288-3.05 5.848-6 .016-.173.042-.346.08-.517 1.056 1.113 2.997 2.362 6.505 3.423 8.64 2.589 22.667 4.304 22.667 4.304s2.532 2.42.625 5.073z" opacity=".31"/><path fill="url(#f)" d="M264 388a7.624 7.624 0 01-2 2 119.75 119.75 0 002-2z"/><path fill="url(#g)" d="M226.3 370.559a6.82 6.82 0 001.7 3.13c-.21.039-.425.092-.641.151L206.088 380c-3.271-.813-5.426-3.865-5.044-7.146.381-3.28 3.181-5.781 6.556-5.854a7.14 7.14 0 011.35.132l17.35 3.427z"/><path fill="#503164" d="M259 89.407s-.276-20.805-17.075-19.01c-16.8 1.793-15.511-5.095-22.687-4.339-7.175.757-15.51 7.786-13.117 16.468 2.395 8.682-6.332 10.623-12.064 17.21-5.733 6.587 1.349 11.976 11.006 18.416 9.657 6.44-.6 4.773 5.125 14.955 5.726 10.181 25.107-2.825 25.107-2.825L259 89.407z"/><path fill="#2BD0D0" d="M122.664 434.601l11.73.399v-93.745s.59-24.241 23.452-26.673c22.861-2.431 230.196-32.466 230.196-32.466s8.218-.87 12.951 14.901c4.733 15.771 9.34 77.787 9.34 77.787l63.64 8.577s1.68-109.55-21.302-115.595c-22.981-6.045-323.522 24.76-323.522 24.76s-22.29 116.352-6.485 142.055z"/><path fill="url(#h)" d="M122.664 434.601l11.73.399v-93.745s.59-24.241 23.452-26.673c22.861-2.431 230.196-32.466 230.196-32.466s8.218-.87 12.951 14.901c4.733 15.771 9.34 77.787 9.34 77.787l63.64 8.577s1.68-109.55-21.302-115.595c-22.981-6.045-323.522 24.76-323.522 24.76s-22.29 116.352-6.485 142.055z" opacity=".197"/><path fill="#2BD0D0" d="M62 303.784s5.744-31.756 46.144-40.079l285.183-32.643s27.996-1.16 40.804 6.587c12.808 7.746 31.088 14.168 38.583 49.223 7.495 35.056 9.286 94.942 9.286 94.942l-7.09 1.1s-10.348-108.44-21.312-115.306c-10.963-6.865-307.402 35.255-307.402 35.255s-20.561 4.088-22.352 34.532c-1.79 30.443 0 96.605 0 96.605L62 409.057V303.784z"/><path fill="url(#i)" d="M355.425 243.844c-14.762-1.9-29.644-3.276-44.519-2.72-11.18.433-22.286 1.966-33.372 3.493l-97.775 13.503c-1.66.23-3.55.603-4.38 2.044-1.592 2.752 2.15 5.464 5.182 6.512 32.51 11.256 67.243 22.656 100.708 14.63 15.3-3.669 29.511-11.288 45.03-13.935 15.518-2.647 31.448-.21 46.933-2.706 14.557-2.345 28.417-9.009 43.172-9.074 4.525 0 9.183.577 13.475-.839 4.293-1.415 8.088-5.739 6.9-10.05-13.853-.478-29.404-3.007-42.992-.262-13.449 2.712-24.894-.596-38.362-.596z" opacity=".19"/><path fill="#2BD0D0" d="M267 259.38l.57 2.114s16.881 10.173 16.775 10.501c-.106.328 70.024-16.24 70.024-16.24L356 251l-89 8.38z"/><path fill="url(#j)" d="M267 259.38l.57 2.114s16.881 10.173 16.775 10.501c-.106.328 70.024-16.24 70.024-16.24L356 251l-89 8.38z"/><path fill="#2BD0D0" d="M268 259.364L330.107 246 356 251.054 285.442 268z"/><path fill="url(#k)" d="M268 259.364L330.107 246 356 251.054 285.442 268z"/><path fill="#2BD0D0" d="M247.832 270.484l14.457.512s3.672.228 4.62-2.717c.95-2.945-5.89-9.16-6.622-9.277-.733-.118-19.76 5.22-17.017 10.556l4.562.926z"/><path fill="url(#l)" d="M247.832 270.484l14.457.512s3.672.228 4.62-2.717c.95-2.945-5.89-9.16-6.622-9.277-.733-.118-19.76 5.22-17.017 10.556l4.562.926z"/><path fill="#2BD0D0" d="M79 416.056l-7.058 21.677c-20.473 7.351-37.88 0-37.88 0L29 415s25.535 8.56 50 1.056z"/><path fill="url(#m)" d="M79 416.056l-7.058 21.677c-20.473 7.351-37.88 0-37.88 0L29 415s25.535 8.56 50 1.056z"/><path fill="#2BD0D0" d="M87 396l-2.284 16.943-5.786 3.008c-24.648 7.42-50.415-1.038-50.415-1.038l-4.443-3.283L22 396h65z"/><path fill="url(#n)" d="M87 396l-2.284 16.943-5.786 3.008c-24.648 7.42-50.415-1.038-50.415-1.038l-4.443-3.283L22 396h65z"/><ellipse cx="54.5" cy="395" fill="#2BD0D0" rx="32.5" ry="6"/><ellipse cx="54.5" cy="395" fill="url(#o)" rx="32.5" ry="6"/><path fill="#2BD0D0" d="M39.641 265.03c-3.182-1.515-6.603-2.658-9.356-4.87-5.547-4.5-6.953-12.248-8.69-19.198-1.736-6.951-5.097-14.593-11.944-16.587-2.562-.737-5.567-.445-7.515 1.39-2.053 1.933-2.47 5.11-1.908 7.914.561 2.804 1.928 5.316 2.985 7.974a36.878 36.878 0 012.172 19.477c-.865 5.389-2.932 10.851-1.605 16.134 2.252 8.964 13.47 14.22 13.78 23.457.212 6.233-4.885 12.001-3.73 18.135.852 4.538 5.005 8.08 5.23 12.692.25 5.23-4.662 9.655-4.424 14.885.237 5.23 5.427 8.725 8.815 12.839a21.453 21.453 0 014.827 12.193c.178 2.791-.179 5.682.726 8.327.66 1.933 1.98 3.575 3.004 5.316 1.13 1.88 1.981 3.914 3.341 5.655a13.696 13.696 0 0014.725 4.651c1.05-6.95.132-14.04.423-21.065.574-13.609 5.691-27.324 2.416-40.535-1.201-4.844-3.512-9.443-3.922-14.413-.363-4.44.812-8.838 1.631-13.217 1.69-9.044 1.664-18.394.97-27.538-.547-7.256-5.618-10.599-11.95-13.616z"/><path fill="#2BD0D0" d="M59.752 300.767c-.053 6.062 1.33 12.33-.612 18.085-1.47 4.362-4.702 7.934-6.371 12.223-3.85 9.899 1.33 21 .273 31.57-.44 4.354-1.936 8.537-2.88 12.813a51.236 51.236 0 00-.851 16.485 4.17 4.17 0 003.325 4.342A51.942 51.942 0 0062.711 399a26.638 26.638 0 013.445-18.59c5.274-8.63 15.522-14.446 17.43-24.359 1.29-6.712-1.715-13.524-1.502-20.355a21.886 21.886 0 014.482-12.548c2.48-3.227 5.839-5.723 8.147-9.07 5.546-8.066 3.817-18.848 2.168-28.494-1.65-9.647-2.607-20.748 3.91-28.057 2.062-2.31 4.748-4.044 6.617-6.513 4.163-5.504 3.112-13.983-1.73-18.902-4.84-4.92-12.635-6.28-19.218-4.116a13.86 13.86 0 00-7.01 4.76c-3.325 4.714-1.995 11.154-.585 16.757 1.23 4.867 2.221 10.483.539 15.39-1.257 3.651-4.443 5.63-7.15 8.172a38.903 38.903 0 00-12.502 27.692z"/><path fill="#30C59B" d="M53.062 354.522c-.938 6.593-2.292 13.239-2.57 19.851v.665a1.757 1.757 0 01-.111.479 51.684 51.684 0 00-.866 16.501c.036.893.261 1.768.66 2.566-.032.279-.072.551-.111.83a13.702 13.702 0 01-14.73-4.652c-1.32-1.741-2.213-3.775-3.342-5.655-1.057-1.748-2.345-3.39-3.005-5.317-.905-2.659-.549-5.536-.727-8.327a21.453 21.453 0 00-4.828-12.196c-3.389-4.087-8.587-7.516-8.818-12.833-.231-5.317 4.676-9.656 4.425-14.887-.224-4.612-4.379-8.154-5.23-12.693-1.157-6.135 3.962-11.903 3.731-18.137-.31-9.238-11.532-14.495-13.785-23.46-1.32-5.284.74-10.747 1.605-16.136a36.876 36.876 0 00-2.146-19.46c-1.057-2.658-2.424-5.163-2.986-7.975-.561-2.81-.145-5.981 1.909-7.922 1.982-1.834 4.954-2.126 7.517-1.389 6.856 1.994 10.204 9.664 11.948 16.615 1.744 6.952 3.144 14.694 8.692 19.2 2.742 2.227 6.176 3.356 9.36 4.872 6.34 3.017 11.413 6.36 11.955 13.55.66 9.145.72 18.496-.97 27.541-.82 4.38-1.982 8.78-1.632 13.219.35 4.44 2.272 8.64 3.527 12.946.139.485.277.977.396 1.469 1.665 6.839 1.13 13.757.132 20.735z"/><path fill="url(#p)" d="M49.718 394a7.789 7.789 0 01-.502-2.488c-.43-5.36-.216-10.78.637-16.047.023-.155.052-.31.08-.465-.171 6.346.374 12.744-.215 19z"/><path fill="#30C59B" d="M107.393 251.014c-1.871 2.47-4.562 4.202-6.627 6.513-6.527 7.303-5.568 18.41-3.916 28.057 1.651 9.646 3.383 20.428-2.172 28.495-2.31 3.32-5.674 5.842-8.159 9.069a21.865 21.865 0 00-4.49 12.548c-.212 6.831 2.798 13.643 1.506 20.355-1.911 9.913-12.175 15.742-17.457 24.36A26.644 26.644 0 0062.654 399a51.824 51.824 0 01-10.064-2.715 5.425 5.425 0 01-2.344-1.415 2.503 2.503 0 01-.247-.345 6.232 6.232 0 01-.699-2.55c-.599-5.506-.3-11.073.886-16.484.033-.16.073-.319.113-.478.946-4.11 2.345-8.14 2.771-12.336a39.84 39.84 0 00-.16-8.166c1.006-6.971 1.545-13.882-.153-20.668-.12-.49-.26-.982-.4-1.467.127-.425.273-.85.44-1.268 1.672-4.289 4.909-7.86 6.38-12.223 1.939-5.756.56-12.023.613-18.085.087-10.47 4.823-20.58 12.429-27.725 2.71-2.542 5.901-4.52 7.16-8.172 1.685-4.907.666-10.523-.54-15.39-1.418-5.603-2.764-12.043.587-16.757 1.665-2.337 4.29-3.857 7.02-4.76 6.567-2.165 14.407-.804 19.249 4.116 4.842 4.92 5.868 13.43 1.698 18.902z"/><path fill="#2BD0D0" d="M225.573 146.146s-27.817 4.3-40.684 34.977c-12.867 30.677-6.176 68.683-5.951 72.027.225 3.344 39.428 17.85 50.635 17.85 11.208 0 13.542-11.229 13.542-11.229l-19.803-8.433 60.17-6.949h10.804l-5.951 10.032s11.743 1.23 19.592 1.511c7.848.281 13.178-15.24 14.057-22.959.88-7.717-34.667-75.458-39.977-79.47-5.31-4.013-19.717-13.817-56.434-7.357z"/><path fill="url(#q)" d="M258.392 88.776s5.032 2.83 4.58 11.985c-.453 9.155-3.29 22.932-6.153 26.5-2.864 3.57-12.88 4.968-12.88 4.968s5.464 12.977 9.53 16.326c4.066 3.349-4.086 15.687-12.015 11.639-7.928-4.049-17.12-14.216-17.12-14.216s6.612-12.245 4.376-18.69c-2.235-6.445-10.772-29.064-4.376-35.242 6.396-6.18 20.186-15.035 34.058-3.27z"/><path fill="#FFF" opacity=".25" d="M214.334 190L210 244.055 223.238 251 234 249.122l-13.428-16.504zM284 187s17.909 42.077 9.97 57l-6.116-1.16L284 187z"/><path fill="url(#r)" d="M235.522 258.045s-6.766 5.775-3.746 10.267c3.02 4.491 6.625 4.363 9.631 2.355 3.006-2.009 8.911-6.776 15.946-4.588 7.035 2.188 8.744 3.58 8.744 3.58s3.705-2.316 2.744-4.639c-.962-2.323-8.32-9.85-10.452-10.825-2.132-.975-10.983 2.021-10.983 2.021s-6.503-1.758-11.884 1.83z"/><path fill="url(#s)" d="M295.191 245.598s-6.385.759-7.998 4.957c-1.613 4.198-2.193 4.71-2.193 4.71s3.606.69 5.106-1.264 3.059-1.133 3.059-1.133l-.447 2.507s9.798 1.477 14.224-.11c4.425-1.589 6.325-3.453 6.325-3.453l1.733-4.24s-4.18-3.03-7.332-3.5c-3.152-.47-12.477 1.526-12.477 1.526z"/><path fill="#25233A" d="M328.893 290s21.934 16.687 19.984 39.259c-1.949 22.572-4.813 56.087-4.813 56.087s-8.846 3.722-14.707 0c-5.862-3.722-9.411-54.65-12.315-59.513-2.904-4.864-20.375-26.79-39.042-28.679L328.893 290z"/><path fill="#3F3D56" d="M219 306.058s10.444 9.895 29.062 13.002c18.619 3.107 27.297 5.7 32.987 21.605 5.69 15.905 11.148 50.137 12.935 53.963 1.786 3.826 9.382 1.874 9.382 1.874s4.296-4.895 4.296-32.114c0-37.946 2.655-45.724-6.913-55.256-9.568-9.533-18.272-12.132-18.272-12.132L219 306.058z"/><path fill="#25233A" d="M294 396l1.82 14.197h3.408s21.948 1.187 22.636.675c.688-.513-1.057-11.243-9.372-10.94-8.316.304-8.861-2.023-8.861-2.023L294 396zm37-9.844L334.518 400l38.437-5.212s1.353-9.093-10.823-8.191c-3.214.234-5.608 2.465-9.471 2.485-3.863.02-7.563-1.543-9.511-4.082L331 386.156z"/><path fill="#2BD0D0" d="M461.804 212.337l-142.243 7.654c-3.44.181-6.376-2.47-6.561-5.926V112.473c.003-4.101 3.267-7.448 7.348-7.535l141.661-2.937a6.835 6.835 0 014.886 1.917 6.898 6.898 0 012.105 4.827v95.971c-.005 4.056-3.164 7.402-7.196 7.621z"/><path fill="#2BD0D0" d="M469.804 212.337l-142.25 7.655c-3.44.177-6.372-2.478-6.554-5.934V112.473c-.004-4.102 3.26-7.452 7.342-7.535l141.68-2.937c3.777-.07 6.898 2.943 6.978 6.738v95.977c-.005 4.057-3.164 7.403-7.196 7.621z"/><path fill="url(#t)" d="M469.804 212.337l-142.25 7.655c-3.44.177-6.372-2.478-6.554-5.934V112.473c-.004-4.102 3.26-7.452 7.342-7.535l141.68-2.937c3.777-.07 6.898 2.943 6.978 6.738v95.977c-.005 4.057-3.164 7.403-7.196 7.621z"/><path fill="#3A3054" d="M427.773 251.138L391.478 255s-11.053-2.23-10.455-3.862c.599-1.633 12.156-3.205 12.156-3.205v-65.804c-.1-.146-1.621-2.084-5.789-3.319-.807-.239-1.628-.43-2.459-.57a7.252 7.252 0 01-2.06-.624c-2.479-1.28.26-3.51 4.107-3.61a9.625 9.625 0 011.802.106h27.913s10.568 2.973 11.08 17.811c.511 14.839 0 59.215 0 59.215z"/><path fill="#51466B" d="M398 251.277L391.322 255s-10.888-2.23-10.299-3.863c.59-1.632 11.995-3.205 11.995-3.205v-65.809c-.138-.152-1.807-1.898-5.703-3.318a28.64 28.64 0 00-4.452-1.195c-2.442-1.28.255-3.51 4.046-3.61 3.228.445 9.585 4.028 9.998 6.073.412 2.044 1.093 71.204 1.093 71.204z"/><path fill="url(#u)" d="M263 389c-.881 1.001-1.29 1.37-.77.547.27-.159.527-.342.77-.547z"/></g></svg> */}
            </div>
            <div className='flex flex-col items-center md:items-start gap-6'>
                <h1 className='font-bold md:text-left text-4xl text-center text-neutral-very-dark-blue'>More than just shorter links</h1> 
                <p className='text-center md:text-left font-medium text-neutral-grayish-violet'>
                    Build your brand’s recognition and get detailed insights 
                    on how your links are performing.
                </p>
                <button className='rounded-full capitalize text-base bg-primary-cyan px-8 py-2 text-white font-bold' type="button">get Started</button>
            </div>
        </main>

        {/* URL INPUT */}
        <div className='bg-gray-100'>
            <div className='w-11/12 md:w-9/12 mx-auto relative '>
                <div className='absolute -top-20  lg:-top-12 left-0 right-0  '>
                    <UrlShortner setIsLoading={setIsLoading} setShortnedUrls={setShortnedUrls} shortnedUrls={shortnedUrls} />
                </div>
                <div className={`flex pt-28 pb- bg-red-20 flex-col gap-8 items-center w-full mx-auto`}>
                    <div className={`${isLoading ? 'flex' : 'hidden'} bg-red-30`}>
                        <ReactLoading type={'bars'} color={'#2acfcf'} height={100} width={100} />
                    </div>

                {
                    shortnedUrls.map((url, index)=>(
                        <div key={index} className='relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white w-full rounded-lg px-4 py-4 shadow-md'>
                            <button id={url?.code} onClick={event=>delete_short_url(event)} className='absolute -right-3 -top-3 p-1 bg-white border rounded-full shadow-lg'>
                                <svg className='pointer-events-none w-5 h-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                            <p className='border-b lg:border-0 pb-2 md:pb-0 text-neutral-very-dark-blue'>{url?.original_link}</p>
                            <div className='flex flex-col lg:flex-row gap-3 justify-end lg:items-center lg:w-6/12'>
                                <p className=' bg-green-20 text-primary-cyan lg:w-fit'>{url?.full_short_link} </p>
                                <button onClick={event=>copyToClibBoard(event)} type='button' className='flex justify-center items-center gap-1 text-white font-semibold w-full lg:w-fit bg-primary-cyan px-4 rounded-lg py-1'>
                                    {
                                        isCopied ?  
                                        <>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                            />
                                            </svg>
                                            <span className='font-semibold'>Copied!</span>
                                        </>
                                      : 'Copy'
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                }
                </div>
                <div className={`${shortnedUrls.length ===0 ? '' : 'pt-16'} mb-12 flex flex-col lg:mx-44 items-center gap-4 pb-12`}>
                    <h1 className='font-bold text-2xl capitalize text-center text-neutral-very-dark-blue'>advanced statistics</h1>
                    <p className='text-center font-medium text-neutral-grayish-violet'>
                        Track how your links are performing across the web with our 
                        advanced statistics dashboard.
                    </p>
                </div>
                {/* CARDS */}
                <div ref={targetRef} className='pb-16 bg-green-300 flex flex-col lg:flex-row gap-20 '>
                    <div className=' relative px-4 py-8 bg-white rounded-lg flex items-center flex-col gap-4'>
                        <div className='p-4 absolute -top-10 flex justify-center items-center bg-primary-dark-violet rounded-full w-fit'>
                            <svg className='' xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#2BD0D0" d="M36.406 11.719c.648 0 1.172.524 1.172 1.172v24.765h1.25a1.172 1.172 0 110 2.344H1.172a1.172 1.172 0 110-2.344h1.25V24.61c0-.647.524-1.172 1.172-1.172H8.28c.648 0 1.172.525 1.172 1.172v13.047h2.344v-8.36c0-.646.524-1.171 1.172-1.171h4.687c.648 0 1.172.525 1.172 1.172v8.36h2.344V19.921c0-.647.524-1.172 1.172-1.172h4.687c.648 0 1.172.525 1.172 1.172v17.734h2.344V12.891c0-.648.524-1.172 1.172-1.172zm-1.172 2.344h-2.343v23.593h2.343V14.063zm-9.375 7.03h-2.343v16.563h2.343V21.094zm-9.375 9.376h-2.343v7.187h2.343V30.47zM7.11 25.78H4.766v11.875h2.343V25.781zM34.062 0a3.52 3.52 0 013.516 3.516 3.52 3.52 0 01-3.516 3.515c-.72 0-1.389-.217-1.947-.59l-4.073 3.055a3.52 3.52 0 01-3.355 4.567 3.496 3.496 0 01-1.514-.344l-4.689 4.688c.22.459.344.973.344 1.515a3.52 3.52 0 01-3.515 3.515 3.52 3.52 0 01-3.488-3.949l-3.45-1.724a3.503 3.503 0 01-2.438.986 3.52 3.52 0 01-3.515-3.516 3.52 3.52 0 013.515-3.515 3.52 3.52 0 013.488 3.949l3.45 1.725a3.503 3.503 0 013.952-.643l4.689-4.688a3.496 3.496 0 01-.344-1.515 3.52 3.52 0 013.515-3.516c.72 0 1.39.218 1.948.59l4.073-3.054A3.52 3.52 0 0134.063 0zm-18.75 18.75c-.646 0-1.171.526-1.171 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.172-1.172-1.172zm-9.374-4.688c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.171-1.171-1.171zm18.75-4.687c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.172 1.172.646 0 1.171-.526 1.171-1.172 0-.646-.525-1.172-1.172-1.172zm9.375-7.031c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.171 1.172 1.171.646 0 1.171-.525 1.171-1.171s-.525-1.172-1.172-1.172z"/></svg>
                        </div>
                        <h2 className='font-bold mt-6 text-xl capitalize text-center text-neutral-very-dark-blue'>Brand Recognition</h2>
                        <p className='text-center font-medium text-neutral-grayish-violet'>
                            Boost your brand recognition with each click. Generic links don’t 
                            mean a thing. Branded links help instil confidence in your content.
                        </p>
                    </div>
                    <div className=' relative px-4 py-8 bg-white rounded-lg flex items-center flex-col gap-4'>
                        <div className='p-4 absolute -top-10 flex justify-center items-center bg-primary-dark-violet rounded-full w-fit'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#2BD0D0" d="M19.968 0c11.01 0 19.969 8.958 19.969 19.968s-8.958 19.969-19.969 19.969C8.958 39.937 0 30.979 0 19.968 0 8.958 8.958 0 19.968 0zm7.805 35.579c-4.863-2.402-10.746-2.402-15.609 0a17.339 17.339 0 007.804 1.862 17.34 17.34 0 007.805-1.862zm-6.556-33.02V6.24H18.72V2.56a17.362 17.362 0 00-9.492 3.656l2.798 2.797-1.765 1.765L7.373 7.89a17.41 17.41 0 00-4.678 9.582h4.793v2.497H2.496c0 5.805 2.857 10.943 7.227 14.122 6.217-3.714 14.274-3.714 20.49 0 4.37-3.179 7.228-8.317 7.228-14.123h-4.992v-2.496h4.793a17.41 17.41 0 00-4.678-9.582l-2.888 2.888-1.765-1.765 2.798-2.797a17.362 17.362 0 00-9.492-3.657zm-2.437 8.292c.332-1.034 2.045-1.034 2.377 0 .635 1.978 3.804 11.955 3.804 14.11a4.997 4.997 0 01-4.993 4.992 4.997 4.997 0 01-4.992-4.992c0-2.155 3.17-12.132 3.804-14.11zm1.188 4.567c-1.233 4.047-2.496 8.522-2.496 9.543a2.5 2.5 0 002.496 2.496 2.5 2.5 0 002.497-2.496c0-1.02-1.263-5.496-2.497-9.543z"/></svg>                        </div>
                        <h2 className='font-bold mt-6 text-xl capitalize text-center text-neutral-very-dark-blue'>Detailed Records</h2>
                        <p className='text-center font-medium text-neutral-grayish-violet'>
                            Gain insights into who is clicking your links. Knowing when and where 
                            people engage with your content helps inform better decisions.
                        </p>
                    </div>
                    <div className=' relative px-4 py-8 bg-white rounded-lg flex items-center flex-col gap-4'>
                        <div className='p-4 absolute -top-10 flex justify-center items-center bg-primary-dark-violet rounded-full w-fit'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#2BD0D0" d="M46.608 6.02a.975.975 0 00-.927-.047l-7.624 3.591a8.283 8.283 0 00-4.728 6.837l-.196 2.436-3.95 6.561v-2.801c0-.01-.006-.017-.006-.027a.974.974 0 00-.046-.284l-1.838-5.514 3.753-7.504a.984.984 0 00-.099-1.03l-5.9-7.867a1.019 1.019 0 00-1.573 0L17.573 8.24a.984.984 0 00-.093 1.03l3.753 7.503-1.838 5.514a.974.974 0 00-.047.284v3.951l-6.127-9.299c-.007-.01-.02-.017-.026-.026a.995.995 0 00-.211-.215c-.02-.013-.036-.03-.056-.042-.02-.013-.022-.02-.035-.027l-3.605-2.085-1.497-2.271L5.628 9.27a.983.983 0 00-1.147-.386L.654 10.227a.983.983 0 00-.491 1.468l2.705 4.107 1.492 2.27.492 4.137a.36.36 0 00.01.04c.004.02.009.041.015.061a.973.973 0 00.116.295c.007.01.007.023.014.033.007.01 14.624 22.165 14.695 22.225A4.87 4.87 0 0024.255 48c.4 0 .8-.05 1.19-.145a4.886 4.886 0 003.028-2.235l13.08-21.698 2.065-1.307a8.343 8.343 0 002.66-2.721 8.259 8.259 0 001.18-4.651l-.383-8.42a.984.984 0 00-.467-.803zm-7.122 17.524l-1.522 2.527-5.054-3.048 1.524-2.527 5.052 3.048zM21.315 38.446V23.58h5.9v5.08l-5.9 9.786zm1.693-20.766h2.515l1.31 3.933h-5.136l1.31-3.933zm1.257-6.885a.983.983 0 110-1.966.983.983 0 010 1.966zm0-8.194l4.75 6.331-3.39 6.78h-.377v-3.13a2.95 2.95 0 10-1.966 0v3.13h-.376l-3.39-6.78 4.75-6.331zM10.53 17.818l-.29.19-3.621 2.387-.333-2.787a.982.982 0 00-.156-.424l-1.081-1.642L6.69 14.46l1.081 1.642a.988.988 0 00.329.31l2.429 1.406zm-6.122-6.826l1.2 1.822-1.642 1.082-1.475-2.232 1.917-.672zm5.249 9.755l2.458-1.624 7.233 10.972v10.726L7.193 22.371l2.464-1.624zm17.135 23.851a2.95 2.95 0 11-5.052-3.048l7.425-12.315h.017v-.027l2.712-4.499 2.527 1.526 2.53 1.52-10.16 16.843zm17.807-25.724a6.353 6.353 0 01-2.028 2.073l-1.747 1.107-2.852-1.717-2.852-1.717.162-2.065a6.318 6.318 0 013.604-5.213L45.18 8.38l.125 2.74a.973.973 0 00-.295.014l-2.382.59a5.986 5.986 0 00-4.425 4.524.983.983 0 001.919.43 4.032 4.032 0 012.977-3.043l2.297-.57.103 2.262a6.304 6.304 0 01-.9 3.548z"/></svg>
                        </div>
                        <h2 className='font-bold mt-6 text-xl capitalize text-center text-neutral-very-dark-blue'>Fully Customizable</h2>
                        <p className='text-center font-medium text-neutral-grayish-violet'>
                            Improve brand awareness and content discoverability through customizable 
                            links, supercharging audience engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* FOOTER */}
        <footer className=''>
            <div style={{backgroundImage:`url(${bg_boost_mobile})`}} className='bg-no-repeat bg-right-top h-fit bg-contain bg-primary-dark-violet'>
                <div  className='w-11/12 md:w-9/12 mx-auto flex gap-6 py-14 flex-col items-center'>
                    <h1 className='font-bold text-white text-2xl text-center'>Boost your links today</h1> 
                    <button className='rounded-full capitalize text-base bg-primary-cyan px-8 py-2 text-white font-bold' type="button">get Started</button>
                </div>
            </div>
            <div className='py-14 bg-neutral-very-dark-violet'>
                <div className='mx-auto w-9/12 flex flex-col md:flex-row items-center md:justify-between gap-9'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="121" height="33"><path fill="white" d="M16.715 7.932c-.068-.09-.306-.26-.714-.51s-.918-.51-1.53-.782-1.281-.51-2.006-.714a8.005 8.005 0 00-2.176-.306c-1.995 0-2.992.669-2.992 2.006 0 .408.107.748.323 1.02.215.272.532.516.952.731.419.215.946.414 1.58.595l1.406.393.805.219c1.156.317 2.198.663 3.128 1.037.929.374 1.717.839 2.363 1.394a5.647 5.647 0 011.496 2.023c.35.793.527 1.745.527 2.856 0 1.36-.255 2.51-.765 3.451-.51.94-1.185 1.7-2.023 2.278-.84.578-1.802.997-2.89 1.258-1.088.26-2.21.391-3.366.391a19.68 19.68 0 01-5.44-.799c-.884-.26-1.74-.572-2.567-.935A14.358 14.358 0 01.53 22.28l2.448-4.862c.09.113.385.329.884.646.498.317 1.116.635 1.853.952.736.317 1.558.6 2.465.85.906.25 1.824.374 2.754.374 1.972 0 2.958-.6 2.958-1.802 0-.453-.148-.827-.442-1.122-.295-.295-.703-.561-1.224-.799a12.455 12.455 0 00-1.504-.56l-1.702-.495-.976-.288c-1.111-.34-2.074-.708-2.89-1.105-.816-.397-1.49-.856-2.023-1.377a5.003 5.003 0 01-1.19-1.802c-.261-.68-.391-1.473-.391-2.38 0-1.27.238-2.391.714-3.366a7.266 7.266 0 011.938-2.465 8.435 8.435 0 012.839-1.513c1.076-.34 2.215-.51 3.417-.51.838 0 1.666.08 2.482.238.816.159 1.598.363 2.346.612.748.25 1.445.533 2.09.85.647.317 1.242.635 1.786.952l-2.448 4.624zM40.139 25h-5.44V14.97c0-1.156-.227-2.006-.68-2.55-.454-.544-1.077-.816-1.87-.816-.318 0-.663.074-1.037.221a4.173 4.173 0 00-1.088.646 5.827 5.827 0 00-.97 1.003 4.4 4.4 0 00-.68 1.292V25h-5.44V.18h5.44v9.962a6.786 6.786 0 012.602-2.465c1.076-.578 2.26-.867 3.553-.867 1.201 0 2.17.21 2.907.629.736.42 1.303.952 1.7 1.598.396.646.663 1.371.799 2.176.136.805.204 1.592.204 2.363V25zm12.34.34c-1.519 0-2.873-.25-4.063-.748-1.19-.499-2.193-1.173-3.01-2.023a8.54 8.54 0 01-1.852-2.958 9.97 9.97 0 01-.63-3.519c0-1.224.21-2.397.63-3.519a8.54 8.54 0 011.853-2.958c.816-.85 1.819-1.53 3.009-2.04s2.544-.765 4.063-.765c1.519 0 2.867.255 4.046.765 1.179.51 2.176 1.19 2.992 2.04a8.754 8.754 0 011.87 2.958 9.736 9.736 0 01.646 3.519 9.97 9.97 0 01-.63 3.519 8.54 8.54 0 01-1.852 2.958c-.816.85-1.82 1.524-3.01 2.023-1.19.499-2.543.748-4.062.748zM48.5 16.092c0 1.405.374 2.533 1.122 3.383.748.85 1.7 1.275 2.856 1.275a3.59 3.59 0 001.564-.34c.476-.227.89-.544 1.24-.952a4.57 4.57 0 00.834-1.479 5.632 5.632 0 00.306-1.887c0-1.405-.374-2.533-1.122-3.383-.748-.85-1.689-1.275-2.822-1.275a3.702 3.702 0 00-2.84 1.292 4.57 4.57 0 00-.832 1.479 5.632 5.632 0 00-.306 1.887zm27.776-4.284c-1.315.023-2.505.238-3.57.646-1.065.408-1.836 1.02-2.312 1.836V25h-5.44V7.15h4.998v3.604c.612-1.201 1.4-2.142 2.363-2.822.963-.68 1.989-1.031 3.077-1.054h.544c.113 0 .227.011.34.034v4.896zm14.074 12.24a21.71 21.71 0 01-2.567.884c-.963.272-1.932.408-2.907.408-.68 0-1.32-.085-1.92-.255a4.286 4.286 0 01-1.582-.816c-.453-.374-.81-.867-1.07-1.479-.262-.612-.392-1.349-.392-2.21v-9.316h-2.278V7.15h2.278V1.472h5.44V7.15h3.638v4.114h-3.638v7.446c0 .59.147 1.014.442 1.275.295.26.669.391 1.122.391.408 0 .827-.068 1.258-.204.43-.136.805-.283 1.122-.442l1.054 4.318zM92.627.18h5.44v18.462c0 1.36.578 2.04 1.734 2.04.272 0 .572-.04.901-.119.329-.08.63-.198.901-.357l.714 4.08c-.68.317-1.462.567-2.346.748-.884.181-1.711.272-2.482.272-1.564 0-2.765-.408-3.604-1.224-.839-.816-1.258-1.995-1.258-3.536V.18zm11.456 27.506c.454.159.879.272 1.275.34a6.4 6.4 0 001.071.102c.658 0 1.168-.227 1.53-.68.363-.453.692-1.27.986-2.448l-6.8-17.85h5.61l4.148 13.192 3.57-13.192h5.1l-6.8 20.74a7.106 7.106 0 01-2.55 3.587c-1.224.918-2.674 1.377-4.352 1.377a8.17 8.17 0 01-1.377-.119 7.516 7.516 0 01-1.41-.391v-4.658z"/></svg>
                    </div>
                    <div className=' text-white text-center flex flex-col md:flex-row gap-8 md:gap-20'>
                        <div className='text-cente flex flex-col gap-4'>
                            <h3 className='font-semibold'>Features</h3>
                            <ul className=' text-neutral-grayish-violet space-y-2 '>
                                <li>Link Shortening</li>
                                <li>Branded Links</li>
                                <li>Analytics</li>
                            </ul>
                        </div>
                        <div className='text-cente flex flex-col  gap-4'>
                            <h3 className='font-semibold'>Resources</h3>
                            <ul className=' text-neutral-grayish-violet space-y-2 '>
                                <li>Blog</li>
                                <li>Developers</li>
                                <li>Support</li>
                            </ul>
                        </div>
                        <div className='text-cente flex flex-col gap-4'>
                            <h3 className='font-semibold'>Company</h3>
                            <ul className=' text-neutral-grayish-violet space-y-2 '>
                                <li>About</li>
                                <li>Our Team</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <svg className='' fill='white' xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                        <svg className=' ' fill='white' xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                        <svg className='' fill='white' xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        <svg className=' ' fill='white' xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>
                    </div>

                </div>
            </div>
        </footer>


    </div>
  )
}

export default App
