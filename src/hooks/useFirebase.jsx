import { useState, useEffect } from "react";
import { useAuth, initialize } from "web-firebase";

const useFirebase = () => {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);

  const { userObserver, userInfo } = useAuth(auth); //! example

  useEffect(() => {
    const { auth: authRes, db: dbRes } = initialize({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
      appId: process.env.REACT_APP_APP_ID,
    });
    userObserver(authRes);
    setAuth(authRes);
    setDb(dbRes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return { auth, db, userInfo };
};
export default useFirebase;
