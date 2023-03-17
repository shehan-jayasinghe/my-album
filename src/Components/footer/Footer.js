import React from "react";
import "./Footer.scss";
const Footer=()=>{
    return(
        <div className='text-end p-3 pe-lg-5 footer' >
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a className='text-dark' href='https://BlackJS.com/'>
                BlackJS.com
            </a>
        </div>
    )
}
export default Footer