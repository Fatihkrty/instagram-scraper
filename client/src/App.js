import "./App.css";
import React, { useState } from "react";
import VersionList from "./components/VersionList";
import VersionDetail from "./components/VersionDetail";
import MajorVersionForm from "./components/MajorVersionForm";

const App = () => {
  const [versions, setVersions] = useState([]);
  const [updateVersion, setUpdateVersion] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const handleVersionClick = (versionId) => {
    setSelectedVersion(versionId);
  };

  const handleVersionUpdateClick = (version) => {
    setUpdateVersion({
      _id: version._id,
      version: version.version,
      releaseDate: version.releaseDate,
    });
  };

  const handleSuccessForm = (newVersion) => {
    setVersions((pre) => [
      newVersion,
      ...pre.filter((x) => x._id !== newVersion._id),
    ]);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <VersionList
          versions={versions}
          setVersions={setVersions}
          onVersionDetailClick={handleVersionClick}
          onVersionUpdateClick={handleVersionUpdateClick}
        />
        {selectedVersion && <VersionDetail versionId={selectedVersion} />}
      </div>

      <hr />

      <div
        style={{
          padding: 20,
          paddingTop: 0,
        }}
      >
        <MajorVersionForm
          version={updateVersion}
          onSuccessForm={handleSuccessForm}
        />
      </div>
    </div>
  );
};

export default App;
