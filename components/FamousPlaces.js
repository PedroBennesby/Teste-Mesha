import React from "react";
import Image from "next/image";
import Link from "next/link";

import FloripaImg from "../public/images/floripa.jpg";
import SpImg from "../public/images/sao-paulo.jpg";
import MaceioImg from "../public/images/maceio.jpg";
import CuritibaImg from "../public/images/curitiba.jpg";
import image from "next/image";

const places = [
  {
    name: "Floripa",
    image: FloripaImg,
    url: "/location/florianópolis-3463237",
  },
  {
    name: "São Paulo",
    image: SpImg,
    url: "/location/são-paulo-3448433",
  },
  {
    name: "Maceió",
    image: MaceioImg,
    url: "/location/maceió-3395981",
  },
  {
    name: "Curitiba",
    image: CuritibaImg,
    url: "/location/curitiba-3464975",
  },
];

export default function FamousPlaces() {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key={index}>
              <Link href={place.url}>
                <a>
                  <div className="places__image-wrapper">
                    <Image
                      src={place.image}
                      alt={`${place.name} Imagem`}
                      layout="fill"
                      objectFit="cover"
                    ></Image>
                  </div>
                  <span>{place.name}</span>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
