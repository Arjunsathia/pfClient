import React from 'react'
import { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'

function Landing() {
  return (
    <>
    <div className="container-fluid ">
      <div className="w-100 row" style={{minHeight:'70vh'}}>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center flex-column">

          <h1>projectFare 2025</h1>
          <p style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste blanditiis voluptatibus, esse sapiente voluptate quo fugiat magni neque nesciunt quam officia! Voluptates amet molestias cupiditate at rem et dolorum?
            

          </p>
          <div className='d-grid'>
            <Link className='btn btn-warning' to={'/auth'}> Explore now...</Link>

          </div>
        </div>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
          <img className='img-fluid' src="https://tse2.mm.bing.net/th?id=OIF.T2UAh9IE10I0hGJ6tRXjtw&pid" alt=""  style={{height:'35rem'}}/>
        </div>

      </div>
      <div className="w-100 my-5">
        <h3>projects you may like...</h3>
        <div className="d-flex justify-content-around my-5">
          <Projectcard/>
          <Projectcard/>
          <Projectcard/>

        </div>
        <div className="text-center">
          <Link to={'/allproject'}>View more...</Link>
        </div>
      </div>

    </div>
    
    
    </>
  )
}

export default Landing