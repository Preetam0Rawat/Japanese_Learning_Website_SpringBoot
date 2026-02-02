import axios from "axios";

const API = axios.create({baseURL : import.meta.env.VITE_API_URL})



export const getKanjiVocabCount = (token) => API.get(`/learn/item-count`, {headers : {Authorization : `Bearer ${token}`}})
      
      
      
export const getVocabByLevel = async(level, page=1, limit=25) => API.get(`/learn/vocabs/by-level?level=${level}&page=${page}&limit=${limit}`)
export const signup = (formData) => API.post('/student/signup', formData)    
export const signin = (formData) => API.post('/student/authenticate', formData)
export const getAllKanjis = () => API.get('/learn/kanjis')
export const getAllVocabularies = () => API.get('/learn/vocabs')
export const getKanjiByLevel = async(level, page=1, limit=25) => API.get(`/learn/kanjis/by-level?level=${level}&page=${page}&limit=${limit}`)
export const getKanjiDetails = (kanjiId) => API.get(`/learn/kanjis/${kanjiId}`)
export const reportBug = (bugText) =>API.post('learn/report', bugText) 


export const getProgressStatus = ({kanjiId, vocabularyId}, token) =>
    API.get(`/learn/progressStatus`, {
      params: {kanjiId, vocabularyId},                              //parameters of quereis
      headers: { Authorization: `Bearer ${token}` },
});

export const addStatusToProgress = ({status, kanjiId, vocabularyId} ,token) => 
  API.post(`/learn/updateStatus`, 
    {status, kanjiId, vocabularyId}, 
    { headers : {Authorization : `Bearer ${token}`}}
  )

  export const removeProgressStatus = ({kanjiId, vocabularyId}, token) =>
      API.delete('/learn/removeStatus', {
        headers: { Authorization: `Bearer ${token}` },
        params: { kanjiId, vocabularyId },
      });