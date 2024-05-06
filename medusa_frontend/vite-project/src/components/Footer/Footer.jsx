import React from 'react'
import style from "./Footer.module.scss";


export const Footer = () => {
    return (
        <div className={style.footerContainerSuper}>
        <div className={style.footerContainer}>
            <div>
                <h2>Contact</h2>
                <p>
                    Supercoffeeroad 223b <br />
                    92230 New Coffeeland <br />
                    Phone 23232323 <br />
                    Mail: coffeeland@info.com <br />
                </p>
            </div>
            <div>
                <h2>Legal</h2>
                <ul>
                    <li>Cookie policy</li>
                    <li>Return policy</li>
                    <li>Shipping</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>
            <div>
                <h2>About</h2>
                <ul>
                    <li>History</li>
                    <li>The people behind</li>
                    <li>Partnerships</li>
                    <li>International</li>
                </ul>
            </div>
        </div>
        </div>
    )
}


