import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setBase64(data.base64);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setBase64('');
    setCopied(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body p-4">
            <h2 className="card-title mb-4">Upload Image</h2>
            
            <div className="mb-4">
              <label htmlFor="imageInput" className="form-label">
                Choose an image file
              </label>
              <input
                type="file"
                className="form-control"
                id="imageInput"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>

            {preview && (
              <div className="mb-4">
                <h5>Preview:</h5>
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded border"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}

            <div className="d-grid gap-2 d-md-flex mb-4">
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={!selectedFile || loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Converting...
                  </>
                ) : (
                  'Convert to Base64'
                )}
              </button>
              {base64 && (
                <button className="btn btn-secondary" onClick={reset}>
                  Reset
                </button>
              )}
            </div>

            {base64 && (
              <div className="alert alert-success">
                <h5 className="alert-heading">Base64 Output:</h5>
                <div className="position-relative">
                  <textarea
                    className="form-control mb-2"
                    rows="6"
                    value={base64}
                    readOnly
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={copyToClipboard}
                  >
                    {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
                <hr />
                <p className="mb-0 small">
                  <strong>Usage in HTML:</strong><br />
                  <code>&lt;img src="{base64.substring(0, 50)}..." alt="Image" /&gt;</code>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">About This Tool</h5>
            <p className="card-text">
              This tool converts your images to Base64 encoded strings that can be embedded 
              directly in HTML, CSS, or JavaScript without requiring separate image files.
            </p>
            <ul>
              <li>Supports all common image formats (JPG, PNG, GIF, WebP, etc.)</li>
              <li>Instant conversion with preview</li>
              <li>Copy to clipboard with one click</li>
              <li>Perfect for embedding images in emails or web pages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
