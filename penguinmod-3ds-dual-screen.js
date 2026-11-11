
(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Enable unsandboxed mode!');
  }

  const screens = {
    TOP: { width: 400, height: 240 },
    BOTTOM: { width: 320, height: 240 }
  };

  class DualScreen {
    constructor() {
      this.assignments = {};
      this.backgrounds = {
        TOP: '#000000',
        BOTTOM: '#000000'
      };
    }

    getScreen(target) {
      return this.assignments[target.id] || 'TOP';
    }

    getInfo() {
      return {
        id: 'penguinMod3dsDualScreen',
        name: '3DS Dual Screen',
        color1: '#2675C9',
        blocks: [
          {
            opcode: 'setScreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'put this sprite on [SCREEN] screen',
            arguments: {
              SCREEN: {
                type: Scratch.ArgumentType.STRING,
                menu: 'screens'
              }
            }
          },
          {
            opcode: 'getScreen',
            blockType: Scratch.BlockType.REPORTER,
            text: 'screen for this sprite'
          },
          {
            opcode: 'getWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: 'width of this sprite screen'
          },
          {
            opcode: 'getHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: 'height of this sprite screen'
          },
          {
            opcode: 'setBackground',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [SCREEN] screen background to [COLOR]',
            arguments: {
              SCREEN: {
                type: Scratch.ArgumentType.STRING,
                menu: 'screens'
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#000000'
              }
            }
          },
          {
            opcode: 'isOnScreen',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is this sprite on [SCREEN] screen?',
            arguments: {
              SCREEN: {
                type: Scratch.ArgumentType.STRING,
                menu: 'screens'
              }
            }
          }
        ],
        menus: {
          screens: {
            acceptReporters: false,
            items: [
              { text: 'top', value: 'TOP' },
              { text: 'bottom', value: 'BOTTOM' }
            ]
          }
        }
      };
    }

    setScreen(args, util) {
      this.assignments[util.target.id] =
        args.SCREEN === 'BOTTOM' ? 'BOTTOM' : 'TOP';
    }

    getScreen(args, util) {
      return this.getScreen(util.target);
    }

    getWidth(args, util) {
      return screens[this.getScreen(util.target)].width;
    }

    getHeight(args, util) {
      return screens[this.getScreen(util.target)].height;
    }

    setBackground(args) {
      this.backgrounds[args.SCREEN] = args.COLOR;
    }

    isOnScreen(args, util) {
      return this.getScreen(util.target) === args.SCREEN;
    }
  }

  Scratch.extensions.register(new DualScreen());
})(Scratch);
