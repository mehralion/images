function getalign(al)
{
  al+="";
  if (al.substring(0,1)=="3") return("������ ��������");
  if (al.substring(0,1)=="2") return("����");
  if (al.substring(0,1)=="1") return("����� ��������");
  if (al=="0.5" || al.substring(0,1)=="7") return("�������");
  return("");
}

function drwfl(name, id, level, align, klan)
{
  var s="";

  if (align!="0") s+="<A HREF=encicl/alignment.html target=_blank><IMG SRC='i/align_"+align+".gif' WIDTH=12 HEIGHT=15 ALT=\""+getalign(align)+"\"></A>";
  if (klan) s+="<A HREF='encicl/klan/"+klan+".html' target=_blank><IMG SRC='i/klan/"+klan+".gif' WIDTH=24 HEIGHT=15 ALT=''></A>";
  s+="<B>"+name+"</B> ";
  if (level!=-1) s+="["+level+"]";
  if (id!=-1) s+="<A HREF='inf.php?"+id+"' target='_blank'><IMG SRC=i/inf.gif WIDTH=12 HEIGHT=11 ALT='���. � "+name+"'></A>";

  document.write(s);
}
