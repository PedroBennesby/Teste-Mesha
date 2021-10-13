import React from "react";
import Image from "next/image";

export default function WeatherSongs({ songs }) {
  return (
    <div className="songs">
      <h3 className="songs__title">
        Músicas para entrar no <span>clima</span>
      </h3>
      {songs.map((song, index) => (
        <div className="songs__card" key={index}>
          <div className="songs__inner">
            <div className="songs__left-content">
              <div>
                <a href={song.share.href} target="_blank">
                  <h3>{song.title}</h3>
                  <h4>
                    <span>{song.subtitle}</span>
                  </h4>
                </a>
              </div>
            </div>
            <div className="songs__right-content">
              <div className="songs__icon-wrapper">
                <div>
                  <a href={song.share.href} target="_blank">
                    <Image
                      layout="fill"
                      src={song.images.coverart}
                      alt={song.title}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
