import React from "react";
import style  from './style.css';

export default function Card({hero}) {
  return (
    <div>
      <div className="portrait">
        <div className="line"></div>
        <img src={hero.thumbnail.path+'/portrait_uncanny.jpg'} alt="hero" className="hero" />
        <div className="heroName">{hero.name}</div>
      </div>
      
    </div>
  );
}
