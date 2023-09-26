import { Component , createRef} from "react";
import ArrowToRight from '../../assests/arrow.png'
import Header from '../Header'
import './index.css'

const carouselList = [
    {
        id: 1, carouselImageClass: "carousel-image-1", heading: "PURSUING EXCELLENCE", paragraph: "We are driven by a relentless pursuit of excellence, continuously exceeding expectations, pushing boundaries, and fostering innovation."
    },
    {
        id: 2, carouselImageClass: "carousel-image-2", heading: "CONQUER CHALLENGES", paragraph: "We fearlessly conquer challenges with a relentless spirit and commitment to excellence."
    },
    {
        id: 3, carouselImageClass: "carousel-image-3", heading: "CREATING A SUSTAINALBE WORLD", paragraph: "Through water management, renewable energy generation, and maintaining infrastructure for our future communities."
    },
]

const countValues ={
    firstSectionCount: 30,
    fourthSecFirstCount:50,
    fourthSecSecondCount:17,
    fourthSecThirdCount:20,
    fourthSecFourthCount:13,
}

let carouselState = true

class Home extends Component {
    state = { currentCarouselIndex: 0, isActive: 1, animateAndCount: {
        firstSectionCount:0,
        fourthSecFirstCount:0,
        fourthSecSecondCount:0,
        fourthSecThirdCount:0,
        fourthSecFourthCount:0,
    }, scrolled:false }


    componentDidMount = () => {
        setInterval(this.changeCarouselRight, 7000)
        setInterval(this.handleStable, 1000)

        
        let countEls = document.querySelectorAll('[name*="count"]');

        console.log({countEls:countEls.length});

        let animateEls = document.querySelectorAll('[name*="animate"]');
        
        console.log({animateEls:animateEls.length});

        for (let i = 0; i < animateEls.length; i++) {
            const el = animateEls[i];
            // let elState = el.getAttribute('name').split('-')[1]
            this.handleInView(el,'animate',el.getAttribute('name'))

        }

        for (let i = 0; i < countEls.length; i++) {
            const el = countEls[i];
            let elState = el.getAttribute('name').split('-')[1]
            this.handleInView(el,'count',elState)

        }

    }

    handleInView = (targetRef,type,elState) => {
        const options = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5, // Trigger when at least 50% of the target is in view
          };
      
          const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if(type == 'count') {
                    this.countDown(countValues[elState],elState)
                }
                targetRef.classList.add(elState)
              }
            });
          }, options);
      
          if (targetRef) {
            observer.observe(targetRef);
          }
    }

    countDown = (expVal, stateName) => {
        console.log('conuntDown');
        let selectNum = 0
        const interval = setInterval(() => {        
            selectNum++
            this.setState((prevState) => ({
                animateAndCount: {
                  ...prevState.animateAndCount,
                  [stateName]: selectNum,
                }
            }))
            if (selectNum === expVal) {
              clearInterval(interval); 
            }
          }, 25); 
    
    }

    changeCarouselRight = () => {

        if (this.state.scrolled == false) {
            console.log('moving carousel', this.state.scrolled);
            this.setState(prevState => ({ 
                currentCarouselIndex: prevState.currentCarouselIndex < carouselList.length && carouselState
                ? prevState.currentCarouselIndex + 1 
                : prevState.currentCarouselIndex - 1  }))
        }


    }

    handleSubChange = (val) => {
        this.setState(({  isActive: val }));
    }


    handleStable = () =>{
        let allMovables = document.querySelectorAll('.movables')

        for (let i = 0; i < allMovables.length; i++) {
            let el = allMovables[i];
            let rect = el.getBoundingClientRect();
            let lastHeight =  Number(el.getAttribute('scroll'))
            console.log('elemtnt top distancne', rect.top, );
            if (rect.top !== lastHeight) {
                console.log('scrolled');
                this.state.scrolled = true
            }else{
                console.log('not scrolled');
                this.state.scrolled = false
            }
            el.setAttribute("scroll",`${rect.top}`)
        }

    }

    render() {
        const { currentCarouselIndex, isActive,animateAndCount, scrolled } = this.state

        if(currentCarouselIndex == carouselList.length - 1){
            carouselState = false
        }
            
        if(currentCarouselIndex == 0){
            carouselState = true
        }
        const descClass = isActive == 1 ? 'sixth-sub-section' : 'sixth-sub-section sixth-sub-section-bg ';
        const specificClass = isActive == 2 ? 'sixth-sub-section' : 'sixth-sub-section sixth-sub-section-bg ';
        const reviewsClass = isActive == 3 ? 'sixth-sub-section' : 'sixth-sub-section sixth-sub-section-bg ';

        const moveClass = scrolled ? carouselList[currentCarouselIndex].carouselImageClass:"";
        const nonMoveClass = !scrolled ? carouselList[currentCarouselIndex].carouselImageClass:"";


        return (
            <>
                <Header />
                <div className={`home-carousel-main  ${moveClass}  `}>
                    {
                        carouselList.map((carousel)=>{
                            return (
                                <>
                                    <div className={`home-carousel-main-container movables ${ !scrolled ? carousel.carouselImageClass : ""}`}
                                      style={{
                                        transform: `translate(-${currentCarouselIndex * 100}%)`,
                                        transition: 'transform 1s ease-in-out',
                                      }}
                                      scroll = "0"

                                     >
                                        <div className="carousel-element-container">
                                            <div className="carousel-header-and-paragraph-container">
                                                <h1 className="carousel-heading">
                                                    {carousel.heading}
                                                </h1>
                                                <p className="carousel-paragraph">
                                                    {carousel.paragraph}
                                                </p>
                                            </div>
                                        </div>
                                    </div >
                                </>
                            )
                        })
                    }
                    

                </div>
                <div className="home-element-container">
                    <section className="first-section">
                        <div name="animate-left" className='first-section-left'>
                            <h2 className="section-heading  ">We Elevate the Beauty of Your Home</h2>
                            <div className="first-faded-text">We created our own Digital Transformation Methodology</div>
                            <div className="first-normal-text">We want to understand who your clients are, how digital-savvy and engaged your employees are, what you are already doing to build a future-proof organisation and absorb anything you’re willing to throw at us. To do this, we gather insights from your employees, we interview key stakeholders and thoroughly look into your organisation.</div>
                            <div className="chat-link">
                                Chat Now
                            </div>
                        </div>
                        <div className="first-section-right">
                            <div className="just-left">
                                <img className="first-section-first-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/8c8554d7cf235632bf2f9e8c/pexels-photo-3735354.jpeg" />
                            </div>

                            <div className="count-down">
                                <h3 name='count-firstSectionCount' className="count-down-number">{animateAndCount.firstSectionCount}k</h3>
                            </div>
                            <img className="first-section-second-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />

                        </div>
                    </section>
                    <section className="second-section" >
                        <div className="second-section-top">
                            <h2 className="section-heading">We dwelling elegance do shutters appetite yourself diverted</h2>
                        </div>
                        <div name="animate-right" className="second-section-bottom">
                            {/* <div className="second-section-bottom-left"></div> */}
                            <div className="second-section-bottom-right">
                                <p className="second-normal-text">Article evident arrived express highest men did boy. Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led. Oh feel if up to till like. He an thing rapid these after going drawn or.</p>
                                <p className="second-faded-text">Article evident arrived express highest men did boy. Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led.</p>
                            </div>
                        </div>
                    </section>
                    <section className="third-section">
                        <div name="animate-left" className="third-section-left">
                            <h2 className="section-heading third-heading">We are the experts in quality business strategy</h2>
                            <img className="third-section-first-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/5422e35a2a6a5324b12925bc/pexels-photo-2628393.jpeg" />
                        </div>
                        <div className="third-section-right">
                            <img className="third-section-second-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/3fbdd4670aaa5744b0b1da4e/pexels-photo-2400547.jpeg" />
                            <p className="third-normal-text">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            </p>
                        </div>
                    </section>
                    <section className="fourth-section">
                        <div name="animate-left"  className="fourth-section-left">
                            <h2 className="section-heading">
                                We are the best agency to improve your deals
                            </h2>
                            <p className="fourth-faded-text">
                                We work directly for our clients and put client’s interests first.
                            </p>
                            <p className="fourth-faded-second-text">
                                Everything that can be necessary to create and manage new projects (startups) in modern conditions. From development of concept, business plan and project management plan, to marketing strategy and tactics, as well as the system of customer attraction via the Internet and sales system.
                            </p>
                        </div>
                        <div className="fourth-section-right">
                            <div className="company-info">
                                <h3 name="count-fourthSecFirstCount" className="company-percent">{animateAndCount.fourthSecFirstCount}%</h3>
                                <p className="company-percent-info">
                                    Sample text. Click to select the text box. Click again or double click to start editing the text.
                                </p>
                            </div>
                            <div  className="company-info">
                                <h3 name="count-fourthSecSecondCount" className="company-percent">{animateAndCount.fourthSecSecondCount}%</h3>
                                <p className="company-percent-info">
                                    Sample text. Click to select the text box. Click again or double click to start editing the text.
                                </p>
                            </div>
                            <div className="company-info">
                                <h3 name="count-fourthSecThirdCount"  className="company-percent">{animateAndCount.fourthSecThirdCount}%</h3>
                                <p className="company-percent-info">
                                    Sample text. Click to select the text box. Click again or double click to start editing the text.
                                </p>
                            </div>
                            <div className="company-info">
                                <h3 name="count-fourthSecFourthCount"  className="company-percent">{animateAndCount.fourthSecFourthCount}%</h3>
                                <p className="company-percent-info">
                                    Sample text. Click to select the text box. Click again or double click to start editing the text.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="fifth-section">
                        <div className="fifth-section-top">
                            <h2 className="section-heading fifth-heading">Customized Digital Marketing Service</h2>
                        </div>
                        <div name="animate-left" className="fifth-section-bottom">
                            <div className="fifth-section-bottom-wrapper">
                                <div className="fifth-section-company-info">
                                    <img className="fifth-section-first-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/122e016aca365586ae3fbb51/pexels-photo-7911758.jpeg" />
                                    <h5 className="fifth-subheading">For business owners</h5>
                                    <p className="fifth-normal-text">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                                    <img className="next-Arrow" src={ArrowToRight} />
                                </div>
                                <div className="fifth-section-company-info">
                                    <img className="fifth-section-second-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/468172906cfa52d09058ab71/pexels-photo-273209.jpeg" />
                                    <h5 className="fifth-subheading">For business owners</h5>
                                    <p className="fifth-normal-text">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                                    <img className="next-Arrow" src={ArrowToRight} />
                                </div>
                            </div>
                            
                        </div>
                    </section>
                    <section className="sixth-section">
                        <div className="sixth-section-top">
                            <button onClick={() => this.handleSubChange(1)} className={`${descClass}`}>Description</button>
                            <button onClick={() => this.handleSubChange(2)} className={`${specificClass}`}>Specifications</button>
                            <button onClick={() => this.handleSubChange(3)} className={`${reviewsClass}`}>Reviews</button>
                        </div>
                        <div className="sixth-section-bottom">
                            {isActive === 1 ? (
                                <div className="desc-info">
                                    <div className="desc-info-left">
                                        <img className="desc-image" src='https://images02.nicepage.com/a1389d7bc73adea1e1c1fb7e/4182ebc926ca5e378edae974/pexels-photo-3914752.jpeg?version=' />
                                    </div>
                                    <div className="desc-info-right">
                                        <h3 className="desc-info-heading">Description</h3>
                                        <p className="desc-info-faded-text">Sample text. Click to select the text box. Click again or double click to start editing the text. Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                                        <ul className="desc-list-container">
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li> 
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li> 
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li>
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li> 
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li> 
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li>
                                            <li className="desc-list">excepteur sint occaecat cupidatat non</li> 
                                        </ul>
                                    </div>

                                </div>
                            ) : isActive === 2 ? (
                                <div>
                                    <p>Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>

                            ) : isActive === 3 ? (
                                <div className="">
                                    <h3>Be The First To Review This Product!</h3>
                                    <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>

                                </div>
                            ) : (
                                <p>Default content</p>
                            )}
                        </div>
                    </section>
                    <section className="seventh-section">
                        <div className="seventh-section-top">
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>                        
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>                                                
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>                        
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>
                            <div className="seventh-section-image-container">
                                <img className="seventh-section-image" src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/eec544a86c9954949f50e530/pexels-photo-3277468.jpeg" />
                            </div>    
                        </div>
                        <div className="seventh-section-bottom">
                            <p className="seventh-section-normal-text">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                            <div className="seventh-icon-container">
                                {/* <TbBrandFacebook />
                                <TbBrandTwitter />
                                <TbBrandInstagram /> */}
                            </div>
                        </div>
                    </section>
                    <section className="eighth-section">
                        <div name="animate-left"  className="eighth-section-left">
                            <h2 className="eighth-section-left-heading">Contact Us</h2>
                            <p className="eighth-section-address">
                            New York, 4140 Parker Rd. <br /> Allentown, <br/> New Mexico 31134
                            </p>
                            <div className="eighth-section-phone">+1 (555) 656 77 89</div>
                            <div className="eighth-section-email">info@sample.com </div>
                        </div>
                        <div name="animate-right"  className="eighth-section-right">
                            <h2 className="eighth-section-right-heading">Sign me up!</h2>
                            <p className="eighth-section-normal-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                            <div className="eighth-section-contact-form">
                                <input className="eighth-section-contact-name" placeholder="Enter your Name" type="text"/>
                                <button className="eighth-section-contact-submit">SUBMIT</button>
                            </div>
                        </div>
                    </section>
                </div>
                {/* <Footer /> */}
            </>
        )
    }
}


export default Home