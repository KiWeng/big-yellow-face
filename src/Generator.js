import React, {useEffect, useRef, useState} from 'react';
import {Col, Row, Select, Button, } from 'antd'
import 'antd/dist/antd.css'
import {mouths, eyes, hands, skinColors, others} from "./AssetsLoader";

const {Option} = Select

const setSelector = item => (
    <Option key={item.name} value={item.name}>
        <img src={item.src} alt={item.name} style={{width: "20px", margin: "0px 6px 6px"}}/>
        {item.name}
    </Option>
)


export default function Generator() {
    const canvasRef = useRef(null);
    const [content, setContent] = useState({})
    const initialContent = {};

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        let component = []
        skinColors.forEach(color => {if (color.name === content.skinColor) component.push(color)})
        mouths.forEach(type => {if (type.name === content.mouth) component.push(type)})
        eyes.forEach(type => {if (type.name === content.eye) component.push(type)})
        hands.forEach(type => {if (type.name === content.hand) component.push(type)})
        others.forEach(type => {if (type.name === content.other) component.push(type)})
        draw(ctx, component);
        console.log(component);
    })

    const handleChange = (key, value) => {
        console.log(key, value);
        setContent({...content, [key]: value});
    }

    const draw = (ctx, content) => {
        content.forEach((element) => {
            const myImage = new Image();
            myImage.onload = () => {
                ctx.drawImage(myImage, element.xPos, element.yPos)
                console.log(myImage);
            }
            myImage.src = element.src;
        })
    }

    return (
        <div style={{
            maxWidth: 600,
            margin: "auto",
            textAlign: "center",
            minHeight: "100vh",
            padding: 16,
        }}>
            <div style={{
                borderRadius: "16px",
                padding: 16,
                backgroundColor: "white",
            }}>
                <canvas
                    className="App-canvas"
                    ref={canvasRef}
                    width="250"
                    height="250"
                    style={{
                        border: "1px solid black",
                        borderRadius: "8px",
                        margin: "auto"
                    }}
                />
                <Row gutter={[16, 16]}>
                    <Col span={24} style={{textAlign: "left"}}>
                        <div style={{paddingBottom: 8}}><label>Skin color</label></div>
                        <Select
                            style={{width: "100%"}}
                            onChange={(value) => handleChange("skinColor", value)}
                        >
                            {skinColors.map(setSelector)}
                        </Select>
                    </Col>
                    <Col span={24} style={{textAlign: "left"}}>
                        <div style={{paddingBottom: 8}}><label>Eye</label></div>
                        <Select
                            style={{width: "100%"}}
                            onChange={(value) => handleChange("eye", value)}
                        >
                            {eyes.map(setSelector)}
                        </Select>
                    </Col>
                    <Col span={24} style={{textAlign: "left"}}>
                        <div style={{paddingBottom: 8}}><label>Mouth</label></div>
                        <Select
                            style={{width: "100%"}}
                            onChange={(value) => handleChange("mouth", value)}
                        >
                            {mouths.map(setSelector)}
                        </Select>
                    </Col>
                    <Col span={24} style={{textAlign: "left"}}>
                        <div style={{paddingBottom: 8}}><label>Hand</label></div>
                        <Select
                            style={{width: "100%"}}
                            onChange={(value) => handleChange("hand",value)}
                        >
                            {hands.map(setSelector)}
                        </Select>
                    </Col>
                    <Col span={24} style={{textAlign: "left"}}>
                        <div style={{paddingBottom: 8}}><label>Other</label></div>
                        <Select
                            style={{width: "100%"}}
                            placeholder="custom dropdown render"
                            onChange={(value) => handleChange("other", value)}
                        >
                            {others.map(setSelector)}
                        </Select>
                    </Col>

                    <Col span={12}>{/*TODO: on the fly generating*/}
                        <Button
                            style={{width: "100%"}}
                            onClick={() => {
                               // TODO
                            }}
                        >
                            Download
                        </Button>
                    </Col>

                    <Col span={12}>
                        <Button
                            style={{width: "100%"}}
                            onClick={() => {
                                setContent({...initialContent})
                            }}
                        >
                            Reset
                        </Button>
                    </Col>
                </Row></div>
        </div>
    )
}
