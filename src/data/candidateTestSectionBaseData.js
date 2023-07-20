export const candidateTestSectionBaseData = {
    testName:'',
    testType:'',
    managedBy:
    {
        name:'Candidate',
        _isMcq:true,
        _isDisabled:false
    },
    screeningType:'',
    totalQuestions:'0',
    randomQuestions:
    {
        totalQuestions:0,
        totalMcq:0,
        totalProgramming:0,
        totalDescriptive:0,
        technology:[],
        questions:[]
    },
    predefinedQuestions:
    {
        totalQuestions:'',
        questions:[],
        technology:[
            { label: 'Python', value: 'Python' },
            { label: 'java', value: 'java' },
            { label: 'php', value: 'php' }
        ],
        questionType:[]
    },
}