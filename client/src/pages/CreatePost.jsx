import React, {useState} from 'react';
// import {useNaviagte} from 'react-router-dom';

import {preview} from '../assets'
import {getRandomPrompt} from '../utils';
import {FormField, Loader} from '../components';

const CreatePost = () => {

    // const navigate = useNaviagte();
    const [form, setForm] = useState({name: '', prompt: '', photo: ''})
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);


    const generateImage = async ()=>{
              // integrating data from backend api 

              if(form.prompt){

                try {
                  setGeneratingImg(true);
                  const response = await fetch('http://localhost:8080/api/v1/dalle',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt}),
                  })
                  const data = await response.json()
                  setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
                } 
                
                catch (error) {
                  alert(error)
                }
                finally{
                  setGeneratingImg(false);
                }
            }
            else{
              alert('Please Enter a prompt')
            }
    }

    const handleSubmit = ()=> {

    }
    const handleChange = (e)=>{
        setForm({...form,[e.traget.name] : e.target.value})
    }
    const handleSurpriseMe = ()=>{
              const randomPrompt = getRandomPrompt(form.prompt);
              setForm({...form, prompt: randomPrompt})
    }

    return (
        <section className='max-w-7xl mx-auto'>

            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    Create
                </h1>
                <p className='mt-2 max-w-[500px] text-[14px]'>
                    Create inventive and visually mesmerizing images through DALL-E AI and share them with the community.
                </p>
            </div>

            <form className='max-w-3xl mt-16' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                  <FormField 
                    labelName = "Your Name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    handleChange= {handleChange}

                  />
                  <FormField 
                    labelName = "Prompt"
                    type="text"
                    name="prompt"
                    placeholder="A plush robot sitting against a yellow wall"
                    value={form.prompt}
                    handleChange= {handleChange}
                    isSurpriseMe
                    handleSurpriseMe = {handleSurpriseMe}

                  />
                  <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center
                  '>
                        {form.photo ? (
                          <img src={form.photo} alt={form.name} className='w-full h-full object-contain' />
                        ):
                        (
                          <img 
                          src={preview}
                          alt='preview'
                          className='w-9/12 h-9/12 object-contain opacity-40'
                          />
                        )}
                        {generatingImg && (
                          <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                <Loader />
                          </div>
                        )}
                  </div>
                </div>

                <div className='mt-5 flex gap-5'>
                            <button 
                            type='button'
                            onClick={generateImage}
                            className='w-full sm:w-auto text-white font-medium bg-green-700 rounded-md tex-sm px-5 py-2.5 text-center'
                            >
                              {generatingImg ? 'Generating...' : 'Generate'}
 
                            </button>
                </div>

                <div className='mt-10'>

                  <p className='mt-2 text-[#666e75] text-[14px]'>
                    Once you have created the image you want, you can share it with others in the community
                  </p>

                  <button className='mt-3 text-white bg-[#6469ff] sm:w-auto w-full text-center py-2.5 px-5 font-medium rounded-md'>
                            {loading ? 'Sharing...' :  'Share with the community'}
                  </button>

                </div>
            </form>


        </section>
    )
}

export default CreatePost;
