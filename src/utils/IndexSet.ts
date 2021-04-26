import CaseTestSet from '../pages/CaseTestSet'
import IndexSet from '../pages/IndexPage'

import caseTestSet from '../assets/caseSet.png';
import algorithmCollectionSet from '../assets/algorithmSet.png';
import interviewSet from '../assets/interviewSet.png';
import projectSet from '../assets/projectSet.png';
import startSet from '../assets/startSet.png';

// 首页导航栏大对象
export default [
    //左上角的react标志
    {
        title : '开始',
        subTitle : 'start',
        imgName : startSet,
        navUrl : '/',
        color:'#03a9f4aa',
        logo : true,
        component : IndexSet
    },
    {
        title : '案例测试集',
        subTitle : 'caseTestSet',
        imgName : caseTestSet,
        navUrl : '/caseTestSet',
        color:'#03a9f4aa',
        component: CaseTestSet
    },
    {
        title : '算法收藏集',
        imgName : algorithmCollectionSet,
        subTitle : 'algorithmCollectionSet',
        navUrl : '/algorithmCollectionSet',
        color:'#f441a5aa',
        component: CaseTestSet
    },
    {
        title : '项目总结集',
        imgName : projectSet,
        subTitle : 'projectAllSet',
        navUrl : '/projectAllSet',
        color:'#ffeb3baa',
        component: CaseTestSet
    },
    {
        title : '面试题目集',
        imgName : interviewSet,
        subTitle : 'interviewProblemSet',
        navUrl : '/interviewProblemSet',
        color: '#03a9f4aa',
        component: CaseTestSet
    },
]
