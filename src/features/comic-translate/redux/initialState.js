// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
    detailInfo:{
        booknum:'',
        bookname: '',
        chaptername: '',
        chapternum: '',
        resourcenum:''
    },
    selectedImage: {},
    scaleInt: 1, 
    color: '#fffffff',
    isDrawing: {
        processing: 2, // 2: not scketch, 1:add comment, 0:processing
        translateX: 0,
        translateY: 0
    },
    comment:{
        list: window.resourceContentList?window.resourceContentList:[{tr_content:"第一行第二行测试", updatetime:"2019-10-23"}],
        newComment: {
            tr_content: "",
            recdata:""
        },
        onlyShowSelected: false,
        defaultActiveTab: "2"
    },
    params:{
        chapterid: window.chapterid,
        resourceid: window.resourceid,
        tasktype: window.tasktype,
        pic: window.pic,
        designPic: {width:window.designPic&&window.designPic.ds_width, 
            height:window.designPic&&window.designPic.ds_height, 
            url:window.designPic&&window.designPic.url
        }
    },
    previlege:{
        editable: window.tasktype=='1' || window.tasktype =='3',
        showTr_content: window.tasktype=='1' || window.tasktype =='2',
        showDesignPic: window.tasktype =='6'
    }
};

export default initialState;
