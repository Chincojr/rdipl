import { Component } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'
import { VscThreeBars } from 'react-icons/vsc'
import companyNavLogo from '../../assests/companyNavLogo.png'
import './index.css'




export const navbarMenu = [
    { id: 1, menuName: "Home", src: "/" },
    { id: 2, menuName: "About", src: "/about" },
    { id: 3, menuName: "Projects", src: "/projects" },
    { id: 4, menuName: "Career", src: "/career" },
    { id: 5, menuName: "Contact", src: "/contact-us" },
]


class Header extends Component {
    state = {
        isSideBarOpen: false, sideBarDisplay: false, imagesLoaded: 0,
    }

    onClickNavThreeLine = () => {
        this.setState({ isSideBarOpen: true, sideBarDisplay: true })
    }

    onExitFromMenuSideBar = () => {
        this.setState({ isSideBarOpen: false })
        setTimeout(() => { this.setState({ sideBarDisplay: false, mobileSubMenu: false }) }, 500)
    }



    componentDidMount() {

        setTimeout(() => {
            let loader = document.getElementById("preloader")
            console.log({ loader });
            loader.style.display = "none"
            console.log("this is the first message");
            console.log('some thing');
        }, 10000);

    }

    render() {
        const { isSideBarOpen, sideBarDisplay } = this.state

        return (
            <>
                <div id="preloader" class="preloader" >
                    <div class="waviy">
                        <span id="r" style={{ '--i': 1 }}>R</span>
                        <span id="d" style={{ '--i': 2 }}>D</span>
                    </div>
                </div>
                <>
                    <nav className="mobile-navbar">
                        <Link className="link-component" to="/">
                            <img className='navbar-logo' src={companyNavLogo} alt='rdipl logo' />
                        </Link>
                        <VscThreeBars className="menubar-icon" onClick={this.onClickNavThreeLine} />
                    </nav>

                    {sideBarDisplay && <div className={`mobile-sidebar-container ${isSideBarOpen ? "mobile-sidebar-container-display-inline" : "mobile-sidebar-container-display-none"}`}>
                        <div className="half-container-with-sidebar" onClick={this.onExitFromMenuSideBar}></div>
                        <aside className="mobile-sidebar">
                            <div className="sidebar-close-icon-container">
                                <MdOutlineClose onClick={this.onExitFromMenuSideBar} className="sidebar-close-icon" />
                            </div>
                            <ul className='mobile-sidebar-list'>
                                {navbarMenu.map(eachMenu => (<Link key={eachMenu.id} className="link-component" to={eachMenu.src}>
                                    <li className='mobile-sidebar-item' >{eachMenu.menuName}</li>
                                </Link>))}
                            </ul>
                        </aside>
                    </div>
                    }
                </>
                <header className='desktop-header'>
                    <div>
                        <Link className="link-component" to="/">
                            <img className='navbar-logo' src={companyNavLogo} alt='rdipl logo' />
                        </Link>
                    </div>
                    <ul className='header-menu-ul'>
                        {
                            navbarMenu.map(eachMenu => (
                                <Link className="link-component" key={eachMenu.id} to={eachMenu.src}>
                                    <li className='nav-menu-item'>
                                        {eachMenu.menuName}
                                    </li>
                                </Link>))
                        }
                    </ul>
                </header>
            </>
        )
    }
}

export default Header