// import React from 'react';

import Heading from "../Heading/Heading";

const Header = () => {
    return (
        <>
            <Heading
            title="Veluvana Bail - Owl Bamboo House"
            subtitle="Surat Thani, Thailand"
            
          />
          <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">

            <img className="object-cover w-full" src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46761225/original/11058c0d-fac8-4035-8f16-8b3abe7441cd.jpeg" alt="header image" />

          </div>
        </>
    );
};

export default Header;