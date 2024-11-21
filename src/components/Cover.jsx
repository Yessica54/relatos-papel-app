import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from '../assets/logo-cover.png';
import useTimer from './TimerHooks';



const Cover = () => {
    const seconds = useTimer();
    const navigate = useNavigate()

    useEffect(() => {
        if(seconds >= 5){
            navigate('/home') 
        }
      }, [seconds])

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center text-center text-bg-dark">
            <div>
                <Image src={logo}  />
                <p>Cada libro es una historia, cada historia una aventura.</p>
                <p>Tu aventura comenzara en {seconds}</p>
                <Button as={Link} to={'/home'} variant="light">Iniciar Aventura</Button>
            </div>
        </div>
    );
}
export default Cover;