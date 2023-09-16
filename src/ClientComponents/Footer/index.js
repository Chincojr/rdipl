import { Link } from 'react-router-dom'
import { navbarMenu } from '../Header'
import { TiSocialLinkedinCircular } from 'react-icons/ti'
import { CgMail } from 'react-icons/cg'
import './index.css'

const Footer = () => (
    <footer className='footer'>
        <div className='footer-element-container'>
            <div>
                <h1 className='footer-heading'>Rockdrill Infrastructure Pvt. Ltd.</h1>
                <p className='footer-company-address'>
                    Harihar Singh Road, Morabadi
                    <br />
                    Ranchi, Jharkhand - 834008
                </p>
            </div>
            <div className='footer-menu-and-social-icon-container'>
                <ul className='mobile-footer-menu-list'>
                    {navbarMenu.map(eachMenu => (
                        <Link className="link-component" key={eachMenu.id} to={eachMenu.src} >
                            <li className='footer-menu'>
                                <span className='footer-menu-right-arrow-span'>{">"}</span> {eachMenu.menuName}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className='footer-social-icon-container'>
                    <Link to="/contact-us">
                        <CgMail className='footer-social-icon' />
                    </Link>
                    <a target='_block' href='https://www.linkedin.com/company/rock-drill-infra/'>
                        <TiSocialLinkedinCircular className='footer-social-icon' />
                    </a>
                </div>
            </div>
        </div>
        <div className='footer-bottom-line-container'>
            <p>All copyrights reserved by Rockdrill Infrastructure Private Limited</p>
        </div>
    </footer >
)

export default Footer