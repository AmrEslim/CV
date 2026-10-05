import React, { useEffect, useState } from 'react';
import './CodeEditor.css';

const CodeEditor = ({ isOpen, onClose }) => {
  const executeRobotCommands = () => {
    class RobotController {
      constructor() {
        this.sensors = [];
        this.motors = ['left', 'right'];
        this.battery = 100;
      }

      initializeSensors() {
        this.sensors = [
          { type: 'ultrasonic', position: 'front' },
          { type: 'infrared', position: 'left' },
          { type: 'infrared', position: 'right' },
          { type: 'camera', position: 'front' }
        ];
        return this.sensors;
      }

      move(direction, speed) {
        const validDirections = ['forward', 'backward', 'left', 'right'];
        const validSpeeds = ['slow', 'medium', 'fast'];

        if (!validDirections.includes(direction)) {
          return;
        }

        if (!validSpeeds.includes(speed)) {
          return;
        }
      }
    }
  };

  return (
    <div id="code-editor" className={isOpen ? 'open' : ''}>
      <div className="code-header">
        <div className="code-title">Robotics Control Interface</div>
        <button className="code-close" onClick={onClose}>×</button>
      </div>
      <div className="code-content">
        <div className="code-display">
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span class="string">'infrared'</span>, <span class="variable">position</span>: <span class="string">'right'</span> {'}'},
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">12</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="variable">type</span>: <span class="string">'camera'</span>, <span class="variable">position</span>: <span class="string">'front'</span> {'}'}
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
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">const</span> validDirections = [<span className="string">'forward'</span>, <span className="string">'backward'</span>, <span className="string">'left'</span>, <span className="string">'right'</span>];
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">18</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">const</span> validSpeeds = [<span className="string">'slow'</span>, <span className="string">'medium'</span>, <span className="string">'fast'</span>];
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">19</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">if</span> (!validDirections.<span className="function">includes</span>(direction)) {'{'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">20</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span>;
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">21</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">22</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">if</span> (!validSpeeds.<span className="function">includes</span>(speed)) {'{'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">23</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span>;
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">24</span>
            <span className="line-content">
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">25</span>
            <span className="line-content">
              &nbsp;&nbsp;{'}'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">26</span>
            <span className="line-content">
              {'}'}
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">27</span>
            <span className="line-content">
              <span className="keyword">const</span> robot = <span className="keyword">new</span> <span className="function">RobotController</span>();
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">28</span>
            <span className="line-content">
              robot.<span className="function">initializeSensors</span>();
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">29</span>
            <span className="line-content">
              robot.<span className="function">move</span>(<span className="variable">direction</span>, <span className="variable">speed</span>);
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;