import FileUpload from '../FileUpload';

// Mock function to simulate evaluation loading
const handleEvaluationLoaded = (evaluation: any) => {
  console.log('Mock evaluation loaded:', evaluation);
  alert('File would be processed in real application');
};

export default function FileUploadExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <FileUpload onEvaluationLoaded={handleEvaluationLoaded} />
    </div>
  );
}