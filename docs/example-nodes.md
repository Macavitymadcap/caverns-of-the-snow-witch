# Example Nodes

```html
<article class="content">
  <h2>1</h2>

  <p>
    By the time you reach the outpost again, the bodies are blanketed with snow
    and the beast's footprints are covered over. The visibility is poor as you 
    set off towards the mountains where you hope to find the abominable killer 
    beast. The snow on the mountainside is soft and you sink in up to your 
    knees as you climb slowly up. You soon find yourself at the edge of a 
    crevasse which is spanned by an ice bridge. If you wish to cross the 
    crevasse by the ice bridge, turn to 
    <a hx-get="/nodes/335.html" hx-target="main">335</a>. 
    If you would rather walk around the crevasse, turn to 
    <a hx-get="/nodes/310.html" hx-target="main">310</a>.
  </p>
</article>
```

```html
<article class="content">
  <h2>13</h2>

  <p>
    By mid-morning Stubb has become quite excited, knowing that he will soon be
    home. Seconds later, the thought of his dead friend Morri depresses him 
    and he shakes his fist at the unseen Hill Trolls. An hour later you see 
    distant wisps of smoke rising into the sky. 'Stonebridge!' yells Stubb. He
    starts to run ahead of you, but suddenly stops when he sees a party of 
    six HILL TROLLS marching towards his village. Screaming a dwarfish 
    battle-cry, he raises his axe and charges at them. You cannot leave your 
    friend to fight them on his own and run forward to fight at his side. Two
    of the Hill Trolls turn to fight you.
  </p>

  <ul class="battle">
    <li>
      First HILL TROLL SKILL 9 STAMINA 10
    </li>

    <li>
      Second HILL TROLL SKILL 9 STAMINA 9
    </li>
  </ul>

  <p>
    Fight them both at the same time. During each Attack Round, they will both
    make a separate attack on you, but you must choose which of the two you 
    will fight. Attack your chosen Hill Troll as in a normal battle. Against 
    the other you will throw for your Attack Strength in the normal way, but 
    you will not wound it if your Attack Strength is greater; you must just 
    count this as though you have defended yourself against its blow. Of 
    course, if its Attack Strength is greater, it will wound you. If you 
    defeat them both, turn to 
     <a hx-get="/nodes/211.html" hx-target="main">211</a>.
  </p>
</article>
```

```html
<article class="content">
  <h2>16</h2>

  <p>
    You take careful aim again and throw the dagger at the knob. 
    <i>Test your Luck</i>. If you are Lucky, turn to 
    <a hx-get="/nodes/120.html" hx-target="main">120</a>.
    If you are Unlucky, turn to 
    <a hx-get="/nodes/153.html" hx-target="main">153</a>.
  </p>
</article>
```

```html
<article class="content">
  <h2>20</h2>

  <p>
    The tunnel soon ends at a T-junction. Stepping into the cross passage you
    almost bump into a primitive- looking man wearing furs and carrying a 
    large stone club. He is a CAVE-MAN. You draw your sword and tell Redswift
    and Stubb to head quickly down the right-hand tunnel while you deal with 
    the Caveman.
  </p>

  <ul class="battle">
    <li>
      CAVE-MAN SKILL 8 STAMINA 8
    </li>
  </ul>
  
  <p>
    If you win, turn to 141. You may Escape after two Attack Rounds by running 
    along the tunnel to catch up with Redswift and Stubb (turn to 
    <a hx-get="/nodes/365.html" hx-target="main">365</a>).
  </p>
</article>
```

```html
<article class="content">
  <h2>88</h2>

  <p>
    The tunnel continues for some distance before opening out into a circular 
    cave. Another tunnel leads out of the cave directly opposite. You are 
    suddenly met by a strange sight - there are two small pools in the floor 
    with steam gently rising from them; protruding from one pool is the hilt of 
    a sword and, from the other, the shaft of a spear. The frozen body of an Orc 
    lies against the wall, its arm rigid and pointing towards the sword. As you 
    approach the pools you see a rhyme carved in the ice floor which reads:
  </p>

  <blockquote>
    Sword or spear<br>
    Strength or fear<br>
    How to choose<br>
    Win or lose
  </blockquote>

  <p>
    You stand and ponder the rhyme, trying to decide what to do. Will you:
  </p>

  <menu>
    <li>
      Draw out the sword from its pool? Turn to 
      <a hx-get="/nodes/237.html" hx-target="main">237</a>
    </li>

    <li>
      Pull out the spear from its pool? Turn to 
      <a hx-get="/nodes/250.html" hx-target="main">250</a>
    </li>

    <li>
      Walk directly through the cave into the tunnel opposite? Turn to 
      <a hx-get="/nodes/221.html" hx-target="main">221</a>
    </li>
  </menu>
</article>
```

```html
<article class="content">
  <h2>313</h2>

  <p>
    As the White Dragon prepares to strike, you rub the copper ring 
    vigorously. A warrior begins to take shape in front of you. Roll one 
    die to see which warrior is summoned.
  </p>

  <table>
    <thead>
      <tr>
        <th>DIE ROLL</th>
        <th>WARRIOR</th>
        <th>SKILL</th>
        <th>STAMINA</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Knight</td>
        <td>9</td>
        <td>10</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Barbarian</td>
        <td>9</td>
        <td>8</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Dwarf</td>
        <td>7</td>
        <td>6</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Elf</td>
        <td>7</td>
        <td>5</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Ninja</td>
        <td>6</td>
        <td>6</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Axeman</td>
        <td>6</td>
        <td>7</td>
      </tr>
    </tbody>
  </table>

  <p>
    The summoned warrior will fight the White Dragon first.
  </p>

  <ul class="battle">
    <li>
      WHITE DRAGON SKILL 12 STAMINA 14
    </li>
  </ul>

  <p>
    If the warrior wins the fight, he will disappear immediately (turn to 
    <a hx-get="/nodes/139.html" hx-target="main">139</a>). If he loses, 
    you must continue to fight yourself. If you win, turn to 
    <a hx-get="/nodes/139.html" hx-target="main">139</a>.
  </p>
</article>
```