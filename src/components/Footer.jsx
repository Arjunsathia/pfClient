import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className="container-fluid bg-dark">
        <div className="row">
            <div className="col">
                <h2>ProjectFare 2025</h2>
                <p style={{textAlign:'justify'}}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, sint fugit architecto quibusdam adipisci cum expedita labore itaque numquam, quos blanditiis ex debitis facere totam omnis. Ab, temporibus! Omnis, eos!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est facere blanditiis molestiae quo similique provident, magni illum in quos, earum maxime amet reiciendis, aliquam consequatur. Repudiandae velit sed rerum dolor!
                </p>
               

            </div>
            <div className="col-2">
                <h1 className='text-center'>Links</h1>
                <div className="d-flex justify-content-around flex-column align-items-center">
                    <Link to={'/'}>Landing</Link>
                    <Link to={'/auth'}>Login</Link>


                </div>
            </div>
            <div className="col">
                <h2>feedbacks</h2>
                <textarea className='form-control' name="" id="" placeholder='Enter feedbacks '></textarea>
                <button className='btn btn-success  my-3'>Send</button>

            </div>
        </div>
        <h6 className='text-center  p-2'> Projectfare 2025  &copy; copyrights reserved  </h6>
    </div>
    
    
    </>
  )
}

export default Footer