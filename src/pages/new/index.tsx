import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import { styles } from "./styles";
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
  Camera
} from "expo-camera";
import { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Recording } from "expo-av/build/Audio";

interface cameraResultsProps {
  width: number;
  height: number;
  uri: string;
}
export default function New() {
  const camRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [status, requestSoundPermission] = useMicrophonePermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function handleRecord() {
    setIsRecording(true);
    try {
      const options = {
        quality: "1080p",
        maxDuration: 60,
        mute: false
      };

      const videoPromise = camRef?.current?.recordAsync(options);
      if (videoPromise) {
        const data = await videoPromise;
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleStopRecord() {
    camRef?.current?.stopRecording();
    setIsRecording(false);

    // setCapturedPhoto(data.uri);
  }
  async function takePicture() {
    if (camRef) {
      const data: cameraResultsProps = await camRef.current?.takePictureAsync();
      setCapturedPhoto(data.uri);
      setIsOpen(true);
    }
  }
  if (!permission) {
    return;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Precisamos de permissão para usar a camera
        </Text>
        <Button onPress={requestPermission} title="dar permissão" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView ref={camRef} style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialIcons
            name="flip-camera-ios"
            style={{ padding: 15 }}
            size={50}
            color="gray"
          />
        </TouchableOpacity>
        {isRecording ? (
          <TouchableOpacity style={styles.button} onPressOut={handleStopRecord}>
            <Entypo
              name="controller-record"
              style={{ padding: 15 }}
              size={50}
              color="red"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            onLongPress={handleRecord}
          >
            <Entypo
              name="controller-record"
              style={{ padding: 15 }}
              size={50}
              color="gray"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleRecord}>
          <SimpleLineIcons
            name="camrecorder"
            style={{ padding: 15 }}
            size={50}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={isOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20
            }}
          >
            <TouchableOpacity>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => setIsOpen(false)}
              />
            </TouchableOpacity>
            <Image
              style={{ width: "100%", height: "80%" }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}
