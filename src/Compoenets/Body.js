import React from 'react'
import { Header } from './Header'
import { GitHub } from './GitHub'
import { Languages } from './Languges'
import { MostPopular } from './MostPopular'
import { Stars } from './Stars'
import { Fork } from './Fork'
import { Search } from './Search'

const Body = ({ userObj, inputRef, fetchData, error, number, loader }) => {
    return (
        <div className='body'>

            <Header />
            <div className='bodyContent'>

                <div className='search-count'>
                    <div style={{ width: "80%", marginRight: '50px', color: 'red' }}>
                        <Search inputRef={inputRef} fetchData={fetchData} />
                        <>{error}</>

                    </div>
                    <div className='count'>{number}/60</div>
                </div>
                {
                    !loader || userObj ? <div className='display-relative'>

                        <GitHub userObj={userObj} />

                        <section className='sectionThree'>
                            <div className='pie'>
                                <Languages userObj={userObj} />
                            </div>
                            <div className='bar'>
                                <MostPopular userObj={userObj} />
                            </div>
                            <div className='pie'>
                                <Stars userObj={userObj} />
                            </div>
                            <div className='bar'>
                                <Fork userObj={userObj} />
                            </div>
                        </section>
                    </div> : <div className='myLoader'><span className="loader"></span></div>
                }

            </div>

        </div>
    )
}

export default Body