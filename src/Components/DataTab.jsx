import React, { useEffect, useState } from "react";
import "./DataTab.css";

const DataTab = ({ data, setFilterTags, filterTags, filterFunction }) => {
  const [role, setRole] = useState("");
  const [language, setLanguage] = useState("");
  const [tool, setTool] = useState("");
  const [level, setLevel] = useState("");

  const handleFilterChange = (tag) => {
    if (filterTags.includes(tag) === true) {
      return;
    } else {
      const copyOfFilterTags = [...filterTags];
      copyOfFilterTags.push(tag);
      setFilterTags(copyOfFilterTags);
    }
  };

  useEffect(() => {
    setRole("");
    setLanguage("");
    setTool("");
    setLevel("");
  }, []);

  useEffect(() => {
    filterFunction("role", role);
  }, [role]);

  useEffect(() => {
    filterFunction("language", language);
  }, [language]);

  useEffect(() => {
    filterFunction("tools", tool);
  }, [tool]);

  useEffect(() => {
    filterFunction("level", level);
  }, [level]);

  return (
    <div className="container flex">
      {data.featured === true ? <div className="bar" /> : null}
      <img src={data.logo} alt="Company logo" className="company-logo" />
      <div className="job-details-section">
        <div className="flex">
          <p className="company-name">{data.company}</p>
          {data.new === true ? <p className="new">NEW!</p> : null}
          {data.featured === true ? <p className="featured">Featured</p> : null}
        </div>
        <p className="job-title">{data.position}</p>
        <div className="flex about">
          <p>{data.postedAt}</p>
          <p>{data.contract}</p>
          <p>{data.location}</p>
        </div>
        <div className="splitter" />
      </div>
      <div className="tools flex">
        <p
          className="role"
          onClick={() => {
            handleFilterChange(data.role);
            setRole(data.role);
          }}
        >
          {data.role}
        </p>
        <p
          className="level"
          onClick={() => {
            handleFilterChange(data.level);
            setLevel(data.level);
          }}
        >
          {data.level}
        </p>
        {data.languages.map((data) => {
          return (
            <p
              className="languages"
              onClick={() => {
                handleFilterChange(data);
                setLanguage(data);
              }}
            >
              {data}
            </p>
          );
        })}
        {data.tools.map((data) => (
          <p
            className="tools-text"
            onClick={() => {
              handleFilterChange(data);
              setTool(data);
            }}
          >
            {data}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DataTab;
