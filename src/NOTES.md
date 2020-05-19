Tutorial 10: Architecture and Hierarchy
SimObject - In world object
    - Id
    - Name
    - Transform
        - Position
        - Rotation
        - Scale
    - Children SimObject[]
    - Parent (ref)
    - Scene (ref)
    - Components (ref)
    
Zone
    - Id
    - Name
    - Description
    - Scene
        - SimObjects
    - Components (provide a method to display something on the screen)

ZoneManager

Scene
    SimObject <- just a container without any logic or render
        SO1
        SO2
            SO1
            SO2
            SO3
        SO3
        
Zone States
    uninitialized
    loading
    updating

Attaching a component to a SimObject holding a sprite and drawing that instead drawing a sprite directly.

Component
    - name
    - simObject
    - update/render
    
SpriteComponent
    - Sprite
