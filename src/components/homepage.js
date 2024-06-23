

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './HomePage.css';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [predictionImage, setPredictionImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleModelSelection = (model) => {
    setSelectedModel(model);
    setSelectedFile(null); // Reset selectedFile when changing the model
    setPredictionImage(null); // Reset predictionImage when changing the model
    setPredictionResult(''); // Reset predictionResult when changing the model
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const endpoint = selectedModel === 'deep-learning' ? '/predict' : '/predict-dp'; // Determine the endpoint based on the selected model

    try {
      const response = await fetch(`https://demobackend-nine.vercel.app/${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*', // Add this line if necessary
        },
      });

      if (response.ok) {
        if (endpoint === '/predict') {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPredictionImage(url);
          const data = await response.json();
          setPredictionResult(data.prediction);
        } else if (endpoint === '/predict-dp') {
          const data = await response.json();
          setPredictionResult(data.prediction);
        }
      } else {
        console.error('Prediction failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred during prediction:', error);
    }
  };

  // return (
  //   <div className="home-page container">
  //     <div className="header d-flex justify-content-end py-2">
  //       <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>Login</button>
  //       <button className="btn btn-primary me-2" onClick={() => navigate('/signUp')}>signUp</button>
  //     </div>
  //     <div className="home-content text-center">
  //       <h1>Brain Tumor Prediction</h1>
  //       <p>Select a model to predict brain tumor:</p>
  //       <div className="buttons my-4">
  //         <button className="btn btn-primary me-2" onClick={() => handleModelSelection('deep-learning')}>LLM Model Segmentation</button>
  //         <button className="btn btn-primary" onClick={() => handleModelSelection('llm')}>DeepLearning Model Classification</button>
  //       </div>
  //       {selectedModel && (
  //         <div className="upload-section my-4">
  //           <h2>{selectedModel === 'deep-learning' ? 'LLM Model' : 'Deep Learning Model'}</h2>
  //           <input type="file" className="form-control-file mb-3" onChange={handleFileChange} />
  //           <button className="btn btn-success" onClick={handlePredict}>Predict</button> {/* Moved the Predict button inside this div */}
  //         </div>
  //       )}
  //       {predictionImage && (
  //         <div className="prediction-result my-4">
  //           <h3>Prediction Result</h3>
  //           <img src={predictionImage} alt="Prediction" className="img-fluid" />
  //         </div>
  //       )}
  //       {predictionResult && (
  //         <div className="prediction-result my-4">
  //           <h3>Prediction Result</h3>
  //           <p>{`The image contains a brain tumor: ${predictionResult}`}</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-blue-100 p-4">
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="text-2xl font-bold">BQUICK</div>
      <div>
        <button
          className="text-blue-500 font-bold py-2 px-4"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="text-blue-500 font-bold py-2 px-4"
          onClick={() => navigate('/signUp')}
        >
          Sign Up
        </button>
      </div>
    </header>
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Brain Tumor Prediction</h1>
    </div>
    <div className="flex justify-center mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">What is Brain Tumor?</h2>
        <p>
          A brain tumor is a mass or growth of abnormal cells in your brain. Many different types of brain tumors exist. Some brain tumors are noncancerous (benign), and some brain tumors are cancerous (malignant).
          Brain tumors can begin in your brain (primary brain tumors), or cancer can begin in other parts of your body and spread to your brain (secondary, or metastatic, brain tumors).
        </p>
      </div>
      {/* <div className="ml-8">
        <img src="https://via.placeholder.com/200" alt="Brain" className="rounded-lg shadow-lg" />
      </div> */}
    </div>
    <div className="text-center mt-8">
      <h3 className="text-2xl font-bold mb-4">Select a model to predict brain tumor:</h3>
      <div className="my-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleModelSelection('deep-learning')}
        >
          LLM Model Segmentation
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleModelSelection('llm')}
        >
          Deep Learning Model Classification
        </button>
      </div>
      {selectedModel && (
        <div className="my-4">
          <h2 className="text-2xl font-bold mb-4">
            {selectedModel === 'deep-learning' ? 'LLM Model' : 'Deep Learning Model'}
          </h2>
          <input
            type="file"
            className="form-control-file mb-3"
            onChange={handleFileChange}
          />
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={handlePredict}
          >
            Predict
          </button>
        </div>
      )}
      {predictionImage && (
        <div className="my-4">
          <h3 className="text-xl font-bold mb-4">Prediction Result</h3>
          <img src={predictionImage} alt="Prediction" className="img-fluid" />
        </div>
      )}
      {predictionResult && (
        <div className="my-4">
          <h3 className="text-xl font-bold mb-4">Prediction Result</h3>
          <p>{`The image contains a brain tumor: ${predictionResult}`}</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default HomePage;
