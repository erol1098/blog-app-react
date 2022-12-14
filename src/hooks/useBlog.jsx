//? Sample
// {
//   author: {
//     displayName: "",
//     photoURL: "",
//     uuid: "",
//   },
//   interaction: {
//     like: 0,
//     view: 0,
//     share: 0,
//   },
//   title: "Hong Kong hotel workers go on unpaid leave as tourists shun city",
//   description:
//     "As the protests in Hong Kong drive away visitors, the city\u2019s hotel workers are in the firing line.",
//   imageURL:
//     "https://s.yimg.com/uu/api/res/1.2/y5C.6QPFXkZKJyM5u8dT2g--~B/aD0zMzQwO3c9NTAxMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-09/c5ccb950-d9e4-11e9-afff-6ee6ea2f5ee4",

//   category: ["regional"],
//   published: "2019-09-18 19:53:25 +0000",
// },

import { useFirestore } from "web-firebase";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../redux/blogSlice";
const useBlog = () => {
  const dispatch = useDispatch();
  const db = useSelector((state) => state.auth.db);
  const { getEntries } = useFirestore(db);

  const getData = async () => {
    try {
      dispatch(blogActions.setLoading(true));
      const res = await getEntries("blogs");
      dispatch(blogActions.setBlogs(res));
      dispatch(blogActions.setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return { getData };
};

export default useBlog;
