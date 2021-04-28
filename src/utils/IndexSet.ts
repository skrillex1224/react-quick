import CaseTestSet from '../pages/CaseTestSet'
import AlgorithmSet from '../pages/AlgorithmSet'
import InterviewSet from '../pages/InterviewSet'
import ProjectSet from '../pages/ProjectSet'
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
        title : '欢迎',
        subTitle : 'Welcome',
        imgName : startSet,
        navUrl : '/',
        color:'#03a9f4aa',
        logo : true,
        component : IndexSet
    },
    {
        title : '案例测试集',
        subTitle : 'CaseTestSet',
        imgName : caseTestSet,
        navUrl : '/caseTestSet',
        color:'#03a9f4aa',
        component: CaseTestSet
    },
    {
        title : '算法收藏集',
        imgName : algorithmCollectionSet,
        subTitle : 'AlgorithmCollectionSet',
        navUrl : '/algorithmCollectionSet',
        color:'#f441a5aa',
        component: AlgorithmSet
    },
    {
        title : '项目总结集',
        imgName : projectSet,
        subTitle : 'ProjectAllSet',
        navUrl : '/projectAllSet',
        color:'#ffeb3baa',
        component: ProjectSet
    },
    {
        title : '面试题目集',
        imgName : interviewSet,
        subTitle : 'InterviewProblemSet',
        navUrl : '/interviewProblemSet',
        color: '#03a9f4aa',
        component: InterviewSet
    },
]
