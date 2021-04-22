import React, {useRef, useState} from "react";
import Cropper from "react-cropper";
/*关闭模块化才能css生效*/
import "cropperjs/dist/cropper.css";
import styles from './index.scss'


export const Index: React.FC = () => {
    const inputEle :any = useRef(null);

    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState<any>();
    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const clickInput = ()=>{
       const inputRef =   inputEle.current
        inputRef.click()
    }
    return (
        <div className={styles.wrapper}>
            <input ref={inputEle} className={styles.wrapper_btn} type="file" onChange={onChange} hidden={true} />
            <div className={styles.wrapper_ops}>
                <div className={styles.wrapper_btn} onClick={clickInput}>
                    上传图片
                </div>
                <div className={styles.wrapper_btn} onClick={getCropData}>
                    剪切图片
                </div>
            </div>
            <div className={styles.wrapper_croppers}>
                {
                    image ? <Cropper
                        style={{ height: 300, width: '40%' }}
                        zoomTo={1}
                        initialAspectRatio={1}
                        preview="#img-preview"
                        src={image}
                        viewMode={1}
                        guides={true}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={16/9}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                    /> : undefined
                }

                {
                    cropData && <div className={styles.wrapper_cropResult}>
                        <img className={styles.wrapper_cropResult_result} src={cropData}  />
                    </div>
                }
            </div>
        </div>


    );
};

export default Index;
