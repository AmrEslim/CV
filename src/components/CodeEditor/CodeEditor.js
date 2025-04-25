import React, { useEffect } from 'react';
import './CodeEditor.css';

const CodeEditor = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Set NODE_OPTIONS environment variable
    if (process.env.NODE_ENV === 'development') {
      process.env.NODE_OPTIONS = '--openssl-legacy-provider';
    }
  }, []);
  return (
    <div id="code-editor" className={isOpen ? 'open' : ''}>
      <div className="code-header">
        <div className="code-title">Robotics Control Terminal</div>
        <button className="code-close" onClick={onClose}>×</button>
      </div>
      <div className="code-content">
        <div className="code-line">
          <span className="line-number">1</span>
          <span className="line-content">
            <span className="keyword">class</span> <span className="function">RobotController</span> {'{'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">2</span>
          <span className="line-content">
            &nbsp;&nbsp;<span className="function">constructor</span>() {'{'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">3</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">this</span>.sensors = [];
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">4</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">this</span>.motors = [<span className="string">'left'</span>, <span className="string">'right'</span>];
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">5</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">this</span>.battery = 100;
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">6</span>
          <span className="line-content">
            &nbsp;&nbsp;{'}'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">7</span>
          <span className="line-content">
            &nbsp;&nbsp;<span className="function">initializeSensors</span>() {'{'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">8</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">this</span>.sensors = [
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">9</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span className="string">'ultrasonic'</span>, <span className="variable">position</span>: <span className="string">'front'</span> {'}'},
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">10</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span className="string">'infrared'</span>, <span className="variable">position</span>: <span className="string">'left'</span> {'}'},
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">11</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span className="string">'infrared'</span>, <span className="variable">position</span>: <span className="string">'right'</span> {'}'},
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">12</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span className="string">'camera'</span>, <span className="variable">position</span>: <span className="string">'front'</span> {'}'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">13</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;];
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">14</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> <span className="keyword">this</span>.sensors;
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">15</span>
          <span className="line-content">
            &nbsp;&nbsp;{'}'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">16</span>
          <span className="line-content">
            &nbsp;&nbsp;<span className="function">move</span>(<span className="variable">direction</span>, <span className="variable">speed</span>) {'{'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">17</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">// Implement robot movement logic</span>
          
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">18</span>
          <span className="line-content">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">console</span>.<span className="function">log</span>(<span className="string">{"`Moving ${direction} at ${speed} speed`"}</span>);

          </span>
        </div>
        <div className="code-line">
          <span className="line-number">19</span>
          <span className="line-content">
            &nbsp;&nbsp;{'}'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">20</span>
          <span className="line-content">
            {'}'}
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">21</span>
          <span className="line-content">
            <span className="keyword">const</span> robot = <span className="keyword">new</span> <span className="function">RobotController</span>();
          </span>
        </div>
        <div className="code-line">
          <span className="line-number">22</span>
          <span className="line-content">
            robot.<span className="function">initializeSensors</span>();
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;