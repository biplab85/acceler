import type { CaseStudyItem } from "@/lib/content";
import Image from "next/image";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { RiParkingBoxLine } from "react-icons/ri";
import styles from "./CaseStudySlide.module.scss";

export function CaseStudySlide({
  image,
  location,
  title,
  result,
  detail,
  bed,
  bath,
  garage,
}: CaseStudyItem) {
  return (
    <div className={styles.slide}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className={styles.image}
        />
        <span className={styles.location}>{location}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.result}>{result}</span>

        <div className={styles.statatusWraper}>
          <div className={styles.LeftContent}>
            {(bed || bath || garage) && (
              <div className={styles.features}>
                {bed && (
                  <span className={styles.feature}>
                    <IoBedOutline className={styles.iconBed} />
                    <span>{bed} Bed</span>
                  </span>
                )}
                {bath && (
                  <span className={styles.feature}>
                    <PiBathtub className={styles.iconBath} />
                    <span>{bath} Bath</span>
                  </span>
                )}
                {garage && (
                  <span className={styles.feature}>
                    <RiParkingBoxLine className={styles.iconGarage} />
                    <span>{garage} Garage</span>
                  </span>
                )}
              </div>
            )}
          </div>
          <p className={styles.detail}>{detail}</p>
        </div>
      </div>
    </div>
  );
}
