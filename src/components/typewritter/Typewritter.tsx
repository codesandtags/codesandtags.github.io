import { useState, useEffect } from "react";

export default function Typewriter({ message }: { message: string }) {
   const [text, setText] = useState("");

   return <span className="typewriter-effect">{message}</span>;
}
