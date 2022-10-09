import { useState, useRef, SyntheticEvent } from "react";
import { db } from "../../firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";

export default function FormSendData() {
  //useState______________________________________________________________________
  const [successFirebase, setSuccessFirebase] = useState<null | string>(null);
  const [errorFirebase, setErrorFirebase] = useState<null | string>(null);

  //useRef________________________________________________________________________
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const introInputRef = useRef<HTMLTextAreaElement>(null);

  const sendDataToDb = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      titleInputRef.current &&
      contentInputRef.current &&
      categoryInputRef.current &&
      introInputRef.current &&
      imageInputRef.current
    ) {
      try {
        const docRef = await addDoc(collection(db, "articles"), {
          title: titleInputRef.current.value,
          content: contentInputRef.current.value,
          intro: introInputRef.current.value,
          category: categoryInputRef.current.value,
          image: imageInputRef.current.value,
          date: new Date().toISOString(),
        });
        setSuccessFirebase("Infos envoyées sur DB Firebase");
        formRef.current && formRef.current.reset();
      } catch (error) {
        setErrorFirebase("Une erreur s'est produite");
        setSuccessFirebase(null);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "20px",
      }}
    >
      <h1>Send data to Firebase</h1>
      <Image
        src="https://images.unsplash.com/photo-1546736317-58e353553344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcHBlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        objectFit="cover"
        alt="img_home"
        width="400px"
        height="200px"
      />
      <form
        ref={formRef}
        onSubmit={sendDataToDb}
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          ref={titleInputRef}
          style={{
            width: "100%",
            border: "none",
            height: "40px",
          }}
        />
        <textarea
          name="intro"
          id="intro"
          placeholder="intro"
          ref={introInputRef}
          style={{
            width: "100%",
            border: "none",
            height: "40px",
          }}
        />
        <textarea
          name="content"
          id="content"
          placeholder="Content"
          ref={contentInputRef}
          style={{
            width: "100%",
            border: "none",
            height: "40px",
          }}
        />
        <input
          type="text"
          name="category"
          id="category"
          placeholder="category"
          ref={categoryInputRef}
          style={{
            width: "100%",
            border: "none",
            height: "40px",
          }}
        />
        <input
          type="text"
          name="image"
          id="image"
          placeholder="image"
          ref={imageInputRef}
          style={{
            width: "100%",
            border: "none",
            height: "40px",
          }}
        />
        <button type="submit" style={{ padding: "1rem 2rem", width: "50%" }}>
          Send to firebase
        </button>
      </form>

      {successFirebase && <h4 className="text-success">{successFirebase}</h4>}
      {errorFirebase && <h4 className="text-danger">{errorFirebase}</h4>}
    </div>
  );
}
