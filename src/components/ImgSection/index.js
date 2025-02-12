import React from 'react'
import ImgBgAnimation from '../ImgBgAnimation'
import { ImgContainer, ImgBg, ImgLeftContainer, Img, ImgRightContainer, ImgInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './ImgStyle'
import ImgImg from '../../images/MyImage.jpg';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';

const ImgSection = () => {
    return (
        <div id="about">
            <ImgContainer>
                <ImgBg>
                    <ImgBgAnimation />
                </ImgBg>
                <ImgInnerContainer >
                    <ImgLeftContainer id="Left">
                        <Title>Hi, I am <br /> {Bio.name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{Bio.description}</SubTitle>
                        <ResumeButton href={Bio.resume} target='display'>My Resume</ResumeButton>
                    </ImgLeftContainer>

                    <ImgRightContainer id="Right">

                        <Img src={ImgImg} alt="Img-image" />
                    </ImgRightContainer>
                </ImgInnerContainer>

            </ImgContainer>
        </div>
    )
}

export default ImgSection