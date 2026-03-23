
function Footer() {
    const now = new Date().getFullYear();
    return (
        <>
            <div className='w-full h-15 bg-cyan-900 text-white flex items-center justify-center font-semibold mt-auto'>
                All Rights reserved &copy; Aime Thierry Byiringiro {now}  
            </div>  
        </>
    );
}

export default Footer;