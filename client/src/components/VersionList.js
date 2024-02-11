import React, { useCallback, useEffect } from "react";
import axios from "axios";

const VersionList = ({
  versions,
  setVersions,
  onVersionDetailClick,
  onVersionUpdateClick,
}) => {
  const fetchVersions = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/versions");
      const data = response.data.versions;
      setVersions(data);
    } catch (error) {
      console.error("Listeleme hatası:", error.message);
    }
  }, [setVersions]);

  const handleDelete = async (versionId) => {
    try {
      console.log(`Deleting version with ID: ${versionId}`);
      await axios.delete(`http://localhost:3001/versions/${versionId}`);

      // Update state after deletion
      setVersions((prevVersions) =>
        prevVersions.filter((version) => version._id !== versionId)
      );
    } catch (error) {
      console.error("Silme hatası:", error.message);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  return (
    <div>
      <div>
        <h2>Instagram APK Sürümleri</h2>
      </div>

      <ol className="olcards">
        {versions.map((version) => (
          <li
            key={version._id}
            style={{ "--cardColor": version.cardColor || "#fc374e" }}
          >
            <div className="content">
              <div>
                <span>version : </span>
                {version.version}
              </div>
              <div>
                <span>releaseDate : </span>
                {version.releaseDate}
              </div>
              <div>
                <span>variantCount : </span>
                {version.variants.length}
              </div>
              <div className="buttons">
                <button onClick={() => onVersionDetailClick(version._id)}>
                  Detay
                </button>
                <button onClick={() => handleDelete(version._id)}>Sil</button>
                <button onClick={() => onVersionUpdateClick(version)}>
                  Güncelle
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VersionList;
