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
    
Zone
    - Id
    - Name
    - Description
    - Scene
        - SimObjects

ZoneManager

Scene
    SimObject
        SO1
        SO2
            SO1
            SO2
            SO3
        SO3